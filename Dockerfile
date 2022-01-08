FROM node:14.17.4
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm i
 
COPY . .

EXPOSE 7030

CMD [ "node", "server.js" ]
