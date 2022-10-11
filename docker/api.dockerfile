FROM node:16.17.0 AS installer
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install

FROM node:16-alpine
WORKDIR /app
COPY --from=installer /app ./
CMD ["npm", "run", "dev"]