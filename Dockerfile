ARG RELEASE_VERSION
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json .
RUN npm ci

COPY src ./src
RUN npm run build

FROM node:20-alpine AS runtime

ENV NODE_ENV=production \
    RELEASE_VERSION=${RELEASE_VERSION}

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
