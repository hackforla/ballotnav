FROM node:12

COPY package*.json ./ballotnav/

WORKDIR /ballotnav
RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm start"]
