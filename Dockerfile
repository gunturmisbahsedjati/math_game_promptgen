# --- Stage 1: Build React App ---
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Serve dengan Nginx ---
FROM nginx:alpine AS production-stage

# Salin konfigurasi Nginx kustom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin hasil build dari stage 1 ke folder Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]