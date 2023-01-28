FROM node:19-alpine as build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
COPY . .
RUN npm run build

FROM nginx:mainline-alpine-slim

COPY --from=build /app/build /usr/share/nginx/html
