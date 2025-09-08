# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json dulu (biar caching lebih efisien)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy seluruh source code
COPY . .

# Expose port (misalnya 3000)
EXPOSE 3022

# Jalankan aplikasi
CMD ["node", "server.js"]
