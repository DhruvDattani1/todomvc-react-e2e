FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install && npm install webpack webpack-cli --save-dev

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
