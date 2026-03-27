FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --include=dev

COPY . .

RUN npm install --legacy-peer-deps --include=dev && npm run build

ENV NODE_ENV=production
ENV PORT=3009

EXPOSE 3009

CMD ["node", "dist/index.js"]