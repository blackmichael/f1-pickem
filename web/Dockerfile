# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Note: 2GB memory limit for build (Docker needs 3GB+ allocated)
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm ci --prefer-offline --no-audit --loglevel=error

# Copy source code
COPY . .

# Build arguments and optimizations
ARG REACT_APP_DEMO_MODE=false
ENV REACT_APP_DEMO_MODE=$REACT_APP_DEMO_MODE
ENV GENERATE_SOURCEMAP=false
ENV CI=true

# Build the application
# CI=true disables progress output and warnings to reduce memory overhead
# Note: This build requires Docker to have at least 3GB of memory allocated
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
