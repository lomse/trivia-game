# Build process
FROM node:alpine3.12 as build-deps

WORKDIR /usr/src/app

COPY .env.sample .env

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

# Production environment
FROM nginx:1.19-alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY configs/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]