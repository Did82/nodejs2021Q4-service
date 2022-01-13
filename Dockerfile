FROM node:16.13-alpine

WORKDIR /app

COPY package*.json .

#RUN ["npm", "install"]
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
