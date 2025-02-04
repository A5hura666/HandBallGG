FROM node:20-alpine

RUN apk add --no-cache python3 py3-pip make g++

ENV NODE_ENV=development
ENV PORT 3000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
