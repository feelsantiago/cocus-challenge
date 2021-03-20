  <p align="center">Code challenge for selective process on <a href="(https://www.linkedin.com/company/cocus/)" target="_blank">Cocus</a></p>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

GitHub Action CI Status: [![build/lint - CI](https://github.com/feelsantiago/cocus-challenge/actions/workflows/github-ci.yml/badge.svg?branch=master)](https://github.com/feelsantiago/cocus-challenge/actions/workflows/github-ci.yml)

---

## Description

Simple api to query github repositories with branches and last commit.

## Installation

```bash
$ npm install
```

## Configuration

Add your [git personal token](https://docs.github.com/en/enterprise-server@2.22/github/authenticating-to-github/creating-a-personal-access-token) in the `.env` file
located on the root of the app.

```env
API_PORT=3000
GIT_PERSONAL_ACCESS_TOKEN={{your_token}}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app on docker

```bash
# production
$ npm run start-docker

# development watch mode
$ npm run start-docker:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
