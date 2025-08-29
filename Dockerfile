# ---------- Stage 1: Build the Angular app ----------

# Use Node.js 20 to build Angular app (compatible with Angular 17)
FROM node:20 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json + package-lock.json first (to install dependencies faster)
COPY package*.json ./

# Install all dependencies defined in package.json
RUN npm install

# Copy the rest of the Angular project files into /app
COPY . .

# Build the Angular app (creates dist/ folder with compiled files)
RUN npm run build

# ---------- Stage 2: Serve the Angular app with Nginx ----------

# Use Nginx (lightweight web server) to serve the Angular app
FROM nginx:alpine

# Copy the built Angular files from previous step into Nginx default HTML folder
# ⚠️ Replace "food-delivery-app" with your project name from angular.json
COPY --from=build /app/dist/food-delivery-app/browser /usr/share/nginx/html

# Expose port 80 (default HTTP port) so the app can be accessed in the browser
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
