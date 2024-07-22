FROM node:latest

ARG PORT=3000
ARG DATABASE_URL
ARG JWT_SECRET

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE ${PORT}

RUN apt-get update -y && apt-get install -y openssl

CMD ["npm", "run", "start:prod"]
