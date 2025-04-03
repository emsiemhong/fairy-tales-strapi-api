# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build Strapi
RUN yarn build

# Expose port 1337
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"]
