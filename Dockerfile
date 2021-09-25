FROM node:14.17.5-slim AS build

WORKDIR /app

COPY tsconfig.json package.json package-lock.json .eslintrc.json swagger.config.yml   ./
ADD src/ /app/src

RUN npm install -y
RUN npm run build

CMD ["node", "dist/index.js"]