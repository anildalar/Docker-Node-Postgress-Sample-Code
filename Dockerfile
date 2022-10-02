FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g nodemon
RUN npm install --production

EXPOSE 5000
CMD ["npm","start"]