FROM node:16.16.0 AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . ./
RUN npm run build


FROM node:16.16.0 AS API
COPY --from=builder /app /app

EXPOSE 4005

CMD [ "node", "/app/dist/server.js" ]