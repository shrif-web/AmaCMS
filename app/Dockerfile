FROM node:15.5.0-alpine

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . .
RUN npm install --verbose

RUN apk add curl
ENTRYPOINT [ "sh", "./wait-for-elastic.sh", "http://elasticsearch:9200", "npm", "run", "start" ]
