FROM node:15.5.0-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN apk add curl

COPY . /app/
ENV NODE_ENV production

ENTRYPOINT [ "sh", "./wait-for-elastic.sh", "http://elasticsearch:9200", "npm", "run", "start" ]
