import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export default async function handler(req, res) {
  // ✅ Only GET allowed
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ✅ Secure authorization (header or ?token= fallback for dashboards)
  const auth = req.headers.authorization;
  const tokenFromHeader = auth && auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
  const tokenFromQuery = req.query.token;

  if (tokenFromHeader !== ADMIN_TOKEN && tokenFromQuery !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ✅ Parse query params for pagination & filtering
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const { email, currency, start, end } = req.query;

  // ✅ Build dynamic filters
  let where = {};
  if (email) where.email = email;
  if (currency) where.currency = currency;
  if (start && end) {
    where.createdAt = {
      gte: new Date(start),
      lte: new Date(end)
    };
  }

  try {
    // ✅ Fetch paginated payments
    const payments = await prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    // ✅ Count total
    const total = await prisma.payment.count({ where });

    // ✅ Aggregate totals by currency
    const totals = await prisma.payment.groupBy({
      by: ['currency'],
      _sum: { amount: true },
      where
    });

    return res.status(200).json({
      data: payments,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      totals: totals.map(t => ({
        currency: t.currency,
        totalAmount: t._sum.amount
      }))
    });

  } catch (e) {
    console.error('❌ Failed to fetch admin payments:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}