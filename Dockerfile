FROM node:alpine

WORKDIR "/app"

COPY ./package.json ./

RUN npm install

# dot itu current directory yang artinya kalau sudah selesai install docker, semua code akan dimasukkan kedalam WORKDIR yaitu /app
COPY . .

CMD [ "npm", "run", "start-prod" ]