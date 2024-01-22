FROM node:18.13.0-buster-slim as build

ENV NODE_OPTIONS='--max_old_space_size=4096'

COPY ./library /build
WORKDIR /build

RUN npm install -g npm@8.19.3
RUN npm ci
RUN npm run build-storybook

FROM nginx

COPY --from=build /build/storybook-static /app
COPY ./deploy/default.conf /etc/nginx/conf.d/default.conf
