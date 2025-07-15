...

---
# 🚀 APPENDIX: ADVANCED SYSTEM LAYER
This section integrates:
- Self-optimizing AI learning paths
- Redis & CDN acceleration
- Autonomous marketing bots (marketing_bot.js, social_scheduler.js)
- Adaptive CI/CD + Prometheus triggers for K8s scaling
- Zero Trust IAM + Cloudflare WAF for bulletproof security

So the system truly functions as an *autonomous, intelligent, self-scaling virtual school entrepreneur.*

# NEXUS ACADEMY - THE BIBLE

### JWT Flow
- JWT secret stored in .env under JWT_SECRET
- Auth middleware reads Bearer <token> header, decodes, attaches user to req.user
- context injects req.user into resolvers
- me query reads from context.user

### GraphQL API
- signup creates hashed user, returns JWT
- login validates password, returns JWT
- me returns current user
- users guarded by if (context.user?.role !== 'ADMIN') throw new Error(...)

### Notes
- All .env secrets secured and gitignored.
- Prisma handles DB migrations.
- App served on http://localhost:4000/graphql.