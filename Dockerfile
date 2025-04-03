# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build Strapi
RUN npm run build

# Expose port 1337
EXPOSE 1337

# Start Strapi
CMD ["npm","run", "start"]
