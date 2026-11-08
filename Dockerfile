# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
WORKDIR /app

# --- Desarrollo (hot reload) ---
FROM base AS dev
EXPOSE 5173
CMD ["sh", "-c", "pnpm install && pnpm dev"]

# --- Build estático ---
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- Producción: Nginx liviano (igual a lo que sirve GitHub Pages) ---
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
