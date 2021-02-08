FROM node:15.5.0-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm install

COPY . /app/

ENV NODE_ENV production

ENTRYPOINT [ "npm", "run", "start" ]