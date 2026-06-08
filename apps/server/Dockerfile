FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/server/package.json apps/server/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN pnpm install --frozen-lockfile

COPY apps/server apps/server
COPY packages packages

FROM base AS development
CMD ["pnpm", "--filter", "server", "dev"]

FROM base AS build
RUN pnpm --filter server build
RUN pnpm deploy --filter server --prod /app/production

FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/production ./
COPY --from=build /app/apps/server/dist ./dist

EXPOSE 3000
CMD ["node", "dist/src/index.js"]

