FROM node:20-slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /evaluations
COPY . /evaluations

COPY package*.json ./

WORKDIR /evaluations

RUN npm install

EXPOSE 8081

CMD ["node", "evaluations.js"]
