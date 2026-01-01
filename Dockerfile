# Development Dockerfile for SvelteKit
# Completely self-contained - just clone and run!

FROM node:24.11.1-alpine

# Set working directory
WORKDIR /app

RUN npm cache clean --force

# Install dependencies for building native modules if needed
RUN apk add --no-cache python3 make g++

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies inside Docker
RUN npm install

# Copy application code
# In development, this gets overridden by volume mount
# But needed for initial container creation
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]