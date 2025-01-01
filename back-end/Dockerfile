FROM node:latest

WORKDIR /usr/app

COPY ./.env ./

COPY prisma ./prisma

COPY package*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
