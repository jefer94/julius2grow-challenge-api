FROM node:alpine

EXPOSE 9000

WORKDIR /usr/src
COPY original-tsconfig.json tsconfig.json

WORKDIR /usr/src/current
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN yarn install --production=true && \
    yarn global add typescript

COPY src src
RUN tsc --build ./tsconfig.json

CMD node ./dist/index.js