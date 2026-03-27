# 1. Build Aşaması
FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Sadece gerekli config dosyalarını ve yamaları (patches) kopyala
COPY package.json pnpm-lock.yaml ./
# EĞER projenin ana dizininde patches klasörü varsa bunu ekle:
COPY patches ./patches 

# Bağımlılıkları kur (Artık yamaları bulabilecek)
RUN pnpm install --frozen-lockfile

# Tüm proje dosyalarını kopyala
COPY . .

# Projeyi build et
RUN pnpm build

# 2. Çalıştırma Aşaması
FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3009

CMD ["pnpm", "start"]
