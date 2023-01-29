FROM node:19-alpine as build

ARG COMMIT_SHA=null
ARG APP_VERSION=0.0.0

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
RUN echo "REACT_APP_VERSION=${APP_VERSION}(${COMMIT_SHA})" >> /app/.env
COPY . .
RUN npm run build

FROM nginx:mainline-alpine-slim

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
