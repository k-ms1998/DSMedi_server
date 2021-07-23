FROM node:14

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
CMD ["node", "server.js"]