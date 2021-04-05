FROM node:lts-alpine
WORKDIR /app
ADD frontend/package.json .
RUN npm install
COPY frontend/src src
COPY frontend/public public
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "deploy"]