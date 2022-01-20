# CloudHumans API

## Description
A full one in `NodeJs` with `Typescript`, using the framework `NestJs`. This version is full extensible, great coverage, looking for the best practices and code standards. It uses both `README.md` and `Swagger` to document the API. 

- On this case, I used `functional programming` with the `chain of responsibility` pattern. `NestJs` has its well defined default code architecture, inspired on `AngularJs`. 

- `NestJs` is used for writing scalable, testable and loosely coupled applications. Choosing it was a obvius choice since was also part of the challange have a full extensible code.

- 

## How to run?

Dependencies:
* `npm` or `yarn`
* `node` (for managing versions, `nvm`)
* `Docker` and `docker-compose`

There are two ways of running this project: With [Docker](https://www.docker.com/) or Locally.

### Running with Docker
```bash
docker-compose up --build
```
The application will be running at `http://localhost:4500`, and you can check the endpoint `Swagger` doc at `http://localhost:4500/api`.

### Installing and Running Locally
If you want to install locally, first, make sure your node version is `> 16`.
```bash
node --version
```
You can use NVM for changing your version, like:
```bash
nvm use 16
```
#### Install
```bash
$ npm install
```

#### Run
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testing the Code

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
