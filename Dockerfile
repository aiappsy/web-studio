# Multi-stage build for production-ready Next.js application
# Optimized for Coolify deployment with security and performance best practices

# ========================================
# Base stage with common dependencies
# ========================================
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check if we need libc6-compat (for Alpine)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# ========================================
# Builder stage
# ========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/package.json /app/package.json
COPY --from=deps /app/package-lock.json /app/package-lock.json

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Set environment variables for build
ARG NEXT_PUBLIC_APP_URL
ARG DATABASE_URL
ARG OPENROUTER_API_KEY
ARG JWT_SECRET
ARG ENCRYPTION_KEY
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-http://localhost:3000}
ENV DATABASE_URL=${DATABASE_URL}
ENV OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
ENV JWT_SECRET=${JWT_SECRET}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}

# Build the application
RUN npm run build

# ========================================
# Production stage
# ========================================
FROM node:18-alpine AS runner

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache dumb-init curl

# Create non-root user for security
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -G 1001 -s /bin/sh -s /sbin/nologin

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nextjs /app/public /app/public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone /app/.next/standalone
COPY --from=builder --chown=nextjs:nextjs /app/node_modules/.prisma /app/node_modules
COPY --from=builder --chown=nextjs:nextjs /app/prisma /app/prisma
COPY --from=builder --chown=nextjs:nextjs /app/healthcheck.js /app/healthcheck.js

# Copy package files
COPY --from=builder --chown=nextjs:nextjs /app/package.json /app/package.json

# Set correct permissions
RUN chown -R nextjs:nextjs /app

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]