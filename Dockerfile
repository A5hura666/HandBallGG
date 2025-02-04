FROM node:20-alpine

RUN apk add --no-cache python3 py3-pip make g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
