FROM node:21.7.3

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]