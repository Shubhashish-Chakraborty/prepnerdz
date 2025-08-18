# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package*.json ./
RUN npm install --production

# ---- Build Stage ----
FROM base AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD [ "node", "dist/index.js" ]
