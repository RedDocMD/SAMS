FROM node:lts-alpine
WORKDIR /app
ADD package.json .
RUN npm install
COPY src/ src
COPY public/ public
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "deploy"]