FROM node:20-alpine AS builder
WORKDIR /srv/app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /srv/app
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/dist ./dist
ENV PORT 3000
CMD ["node", "dist/main"]
