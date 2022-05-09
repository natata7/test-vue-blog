# Stage 1
FROM node:lts-alpine as build-stage
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:stable-alpine as production-stage
# Add nginx config
COPY ./nginx.conf /temp/nginx.conf
RUN envsubst /front < /temp/nginx.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /front/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]