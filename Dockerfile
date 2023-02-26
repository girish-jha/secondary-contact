# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18-alpine as build-env
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY package.json .
COPY package-lock.json .

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

COPY . . 
# Build the app
RUN npm run build
# ==== RUN =======

FROM node:18-alpine as runtime
RUN npm install -g serve 
WORKDIR /build
# Set the env to "production"
ENV NODE_ENV production


COPY --from=build-env /app/build .
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve" ]