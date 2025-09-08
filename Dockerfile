FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install  

# Copy source
COPY . .

# Build TypeScript ke dist/
RUN npm run build

ENV PORT=3000
EXPOSE $PORT

# Jalankan hasil build
CMD ["npm", "start"]