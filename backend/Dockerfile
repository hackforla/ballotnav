FROM node:12

COPY package*.json ./ballotnav/

WORKDIR /ballotnav
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]
