FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install webpack webpack-cli --save-dev
RUN npm run build
RUN npm install -g server
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000", "-n", "-H", "0.0.0.0"]
