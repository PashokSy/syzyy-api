# syzyy-api

This is a repository for back end API of blog app.

## Project Setup

Instructions to spin up this project.

### Prerequisites

- install [NodeJS](https://nodejs.org/) LTS version.
- register on [MongoDB](https://www.mongodb.com/)
- create .env file in main directory with two variables:
  - PORT - (optional) Type a port for local host. Default: 5000;
  - MONGO_URI - MongoDB [connection string](https://www.mongodb.com/docs/manual/reference/connection-string/).

### Installation

Run:

```bash
npm install
```

### Deployment

Run:

```bash
npm start
```

## Endpoints

| Endpoint           | Description       |
| ------------------ | ----------------- |
| POST /auth/sign-up | register new user |
| POST /auth/sign-in | login user        |
