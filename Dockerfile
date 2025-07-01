# Dockerfile

# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm ci

# Copy remaining files and build
COPY . .
RUN npm run build

# Stage 2: Production runner
FROM node:18-alpine AS runner

# Set environment
WORKDIR /app
ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
