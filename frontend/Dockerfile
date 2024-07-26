FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune

EXPOSE 3000

CMD ["npm", "run", "start"]
