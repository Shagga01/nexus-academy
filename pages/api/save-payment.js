import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount, currency, method, reference } = req.body;

  // ✅ Basic sanity check
  if (!email || !amount || !currency || !method || !reference) {
    console.warn('Missing fields:', req.body);
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // ✅ Create payment record
    const payment = await prisma.payment.create({
      data: {
        email,
        amount: parseFloat(amount),
        currency,
        method,
        reference,
      }
    });

    console.info('✅ Payment saved:', payment);

    return res.status(200).json(payment);

  } catch (e) {
    console.error('❌ Failed to save payment:', e);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}