FROM node:22.13
WORKDIR /usr/src/app
COPY ./api/package*.json ./
RUN npm install
EXPOSE 7777
CMD ["npm", "run", "start:dev"]
