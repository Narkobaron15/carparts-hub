FROM node:alpine
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune

EXPOSE 3000

CMD ["npm", "run", "start"]
