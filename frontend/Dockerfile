FROM node:lts-alpine AS dev

WORKDIR /app

COPY src/ /app/src
COPY .eslintignore /app/.eslintignore
COPY .eslintrc.cjs /app/.eslintrc.cjs
COPY package.json /app/package.json
COPY postcss.config.js /app/postcss.config.js
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.js /app/tailwind.config.js
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts

RUN npm install

ENTRYPOINT [ "npm", "run", "dev"]

FROM node:lts-alpine as build

WORKDIR /app

# copy node modules from dev stage
COPY --from=dev /app/ /app/

RUN npm run build

FROM node:lts-alpine as prod

WORKDIR /app

COPY --from=build /app/ /app/

WORKDIR /app/build

ENTRYPOINT [ "node", "index.js" ]
