# Stage 1: Build the static files
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a default nginx config (optional, if needed)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
