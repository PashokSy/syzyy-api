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

| Endpoint                          | Description                    |
| --------------------------------- | ------------------------------ |
| Auth                              |
| POST /api/v1/auth/sign-up         | register new user              |
| POST /api/v1/auth/sign-in         | login user                     |
| Article                           |
| POST /api/v1/article              | create new article             |
| GET /api/v1/article               | get all articles               |
| GET /api/v1/article/:id           | get article by id              |
| PATCH /api/v1/article/:id         | upgrade article by id          |
| DELETE /api/v1/article/:id        | delete article by id           |
| Commentary                        |
| POST /api/v1/commentary           | create new commentary          |
| GET /api/v1/commentary/:articleId | get commentaries by article id |
| GET /api/v1/commentary/:id        | delete commentary by id        |
