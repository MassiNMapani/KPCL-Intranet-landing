# syntax=docker/dockerfile:1.7

# Build and start guidance:
# Preferred startup from repo root:
#   docker compose --env-file .env up -d --build
# Standalone image build:
#   docker build -f server/Dockerfile -t kpcl-intranet-backend .
# Standalone container run:
#   docker run --env-file .env -p 8080:8080 kpcl-intranet-backend

FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json

RUN npm ci

FROM deps AS build
COPY shared ./shared
COPY server ./server

RUN npm run build --workspace server

FROM node:20-alpine AS prod-deps
WORKDIR /app

COPY package*.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json

RUN npm ci --omit=dev --workspace server --include-workspace-root=false

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache wget

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/server/dist ./server/dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q -O /dev/null http://localhost:8080/health || exit 1

CMD ["node", "server/dist/server/src/server.js"]
