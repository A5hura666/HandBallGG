FROM node:18-alpine

ENV NODE_ENV=development
ENV PORT 3000


ENV DATABASE_mongodb=HandGallGG

ENV JWT_SECRET=tata
ENV JWT_EXPIRES_IN=90d
ENV JWT_COOKIE_EXPIRES_IN=90


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
