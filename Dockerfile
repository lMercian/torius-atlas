# Build Aşaması
FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

# Bağımlılıkları kur ve build et
RUN pnpm install
RUN pnpm build

# Çalıştırma Aşaması
FROM node:20-slim
WORKDIR /app
RUN corepack enable

# Sadece gerekli dosyaları kopyala
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3009
CMD ["pnpm", "start"]
