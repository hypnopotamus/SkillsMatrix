FROM node:18.12.0
COPY package.json package.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY docker.npmrc .npmrc
RUN npm install

ENTRYPOINT [ "npm", "run", "db:seed" ]