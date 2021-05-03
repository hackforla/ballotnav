FROM node:16-slim

WORKDIR /ballotnav

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
