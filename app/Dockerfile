FROM node:15.5.0-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY . /app/
ENV NODE_ENV production

ENTRYPOINT [ "npm", "run", "start" ]
