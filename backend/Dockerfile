# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# ─── Stage 2: Production image ────────────────────────────────────────────────
FROM node:20-alpine AS runner

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nestjs

WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed
COPY --from=builder --chown=nestjs:nodejs /app/dist           ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules   ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json   ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/prisma         ./prisma

USER nestjs

# Cloud Run listens on $PORT (default 8080)
EXPOSE 8080
ENV PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/api/v1 || exit 1

CMD ["node", "dist/main"]
