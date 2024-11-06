FROM cypress/base:16.13.0

RUN mkdir /e2e-test

WORKDIR /e2e-test

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "tests"]
