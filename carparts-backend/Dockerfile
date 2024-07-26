ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT

FROM node:alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production

EXPOSE $PORT

# TODO: Remove seed line in production
ENTRYPOINT npx prisma migrate deploy &&\
npx prisma db seed &&\ 
node dist/src/main
