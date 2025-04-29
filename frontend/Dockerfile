# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the frontend code
COPY . .

# Expose Vite default port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]
