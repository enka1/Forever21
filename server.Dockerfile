FROM node as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY --from=builder /app/package.json .
RUN npm install --production
COPY --from=builder /app/server ./server
CMD [ "npm", "start" ]
