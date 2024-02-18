FROM node:slim
WORKDIR usr/src/app
RUN npm install
COPY . .
CMD [ "node","server.js" ]
EXPOSE 8088
