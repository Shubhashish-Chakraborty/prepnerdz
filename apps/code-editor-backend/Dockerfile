# ---- Builder Stage ----
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package files and install everything
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Install system dependencies needed for code execution
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Run the build command (tsc will be available here)
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /usr/src/app

# Install system dependencies needed for code execution
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port and run the app
EXPOSE 5000
CMD [ "node", "dist/index.js" ]