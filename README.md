# rafaolix.github.io

Portafolio personal. Vite + Tailwind v4 + GSAP.

## Desarrollo local

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Docker

```bash
docker compose up --build     # http://localhost:8080
docker compose --profile dev up dev   # hot reload
```

## Flujo de ramas

- `qa`: pruebas locales y CI de build
- `main`: al hacer push, GitHub Actions publica en GitHub Pages
