ARG DATABASE_URL
ARG JWT_SECRET

FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4000

ENTRYPOINT npx prisma migrate deploy &&\
npx prisma db seed &&\
node dist/src/main
