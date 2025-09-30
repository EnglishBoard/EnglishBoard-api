FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

# Arranque
CMD ["node", "src/app.js"]
