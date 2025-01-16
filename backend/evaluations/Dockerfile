FROM node:20

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

RUN mkdir /evaluations
COPY . /evaluations

COPY package*.json ./

WORKDIR /evaluations

RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install

EXPOSE 8081

CMD ["node", "evaluations.js"]
