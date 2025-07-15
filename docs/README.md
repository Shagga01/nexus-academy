# 📚 Documentation
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

## MVP Scope Update - July 2025

✅ Added JWT Authentication with roles (STUDENT, TEACHER, PARENT, ADMIN)
✅ Added 'me' query to return current logged-in user from JWT.
✅ Added role guards so only ADMIN can query users.
✅ Used middleware authenticateToken to decode JWT and populate req.user.
✅ Context passes { user } into GraphQL resolvers.

*Tech stack still:*
- Express + ApolloServer
- PostgreSQL via Prisma ORM
- bcryptjs for password hashing
- jsonwebtoken for authentication
- helmet, morgan, cors for security

*Future improvements:*
- Refresh tokens
- Password reset flow
- Course enrollment + payments