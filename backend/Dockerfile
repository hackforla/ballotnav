FROM node:12

COPY package.json ./ballotnav/
COPY package-lock.json ./ballotnav/

WORKDIR /ballotnav
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
