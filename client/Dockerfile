# syntax=docker/dockerfile:1.7

# Build and start guidance:
# Preferred startup from repo root:
#   docker compose --env-file .env up -d --build
# Standalone image build:
#   docker build -f client/Dockerfile -t kpcl-intranet-frontend .
# Standalone container run:
#   docker run -e BACKEND_HOST=host.docker.internal -e BACKEND_PORT=8080 -p 4173:80 kpcl-intranet-frontend

FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json

RUN npm ci

FROM deps AS build
ARG VITE_API_BASE_URL=/api

WORKDIR /app

COPY shared ./shared
COPY client ./client

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build --workspace client

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache wget

COPY client/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/client/dist /usr/share/nginx/html

ENV BACKEND_HOST=backend
ENV BACKEND_PORT=8080

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/healthz || exit 1
