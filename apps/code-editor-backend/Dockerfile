# ---- Builder Stage ----
# This stage installs ALL dependencies (including dev) and builds the source code
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package files and install everything
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build command (tsc will be available here)
RUN npm run build


# ---- Production Stage ----
# This stage creates the final, lean image with only what's needed to run
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port and run the app
EXPOSE 5000
CMD [ "node", "dist/index.js" ]
