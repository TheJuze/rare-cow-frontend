FROM node:16.13.0-alpine
WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN apk add git && \
    yarn install --silent && \
    yarn add react-scripts@4.0.3 -g --silent

COPY . ./

CMD ["yarn", "start"]