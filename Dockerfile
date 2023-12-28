FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["node","dist/main.js"]