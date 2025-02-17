# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# Production image
FROM nginx:1.27-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Set environment variables for Node.js version and path
ENV NODE_VERSION=20.18.1

# Install dependencies and Node.js
RUN apk add --no-cache curl \
 && curl -fsSL https://unofficial-builds.nodejs.org/download/release/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64-musl.tar.xz | tar -xJ -C /usr/local --strip-components=1 \
 && ln -s /usr/local/bin/node /usr/bin/node \
 && ln -s /usr/local/bin/npm /usr/bin/npm \
 && ln -s /usr/local/bin/npx /usr/bin/npx

# Verify installation
RUN node --version && npm --version

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
