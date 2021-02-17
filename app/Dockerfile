FROM node:15.5.0-alpine

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install curl for wait-for-elastic script 
RUN apk add curl

# Install app dependencies
COPY . .
RUN npm install --verbose

ENTRYPOINT [ "sh", "./wait-for-elastic.sh", "http://elasticsearch:9200", "npm", "run", "start" ]
