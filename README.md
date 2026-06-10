# NestJS SQL JWT API

A simple NestJS REST API sample using an SQL database and JWT-based authentication.

## Features

- `User` and `Post` entities with a relationship: each post belongs to a user
- Persistent storage using SQLite via TypeORM
- JWT authentication with a login endpoint
- Protected routes for authorized requests
- End-to-end tests covering token issuance and secured access

## Project pattern

This project uses the conventional NestJS module-based pattern:

- `Modules` group related functionality and support dependency injection
- `Controllers` handle HTTP requests and responses
- `Services` contain business logic and database access
- `Entities` define SQL data models

This pattern is widely used in NestJS because it provides clear separation of concerns, keeps the codebase modular, and makes it easy to add new features or write isolated tests.

## Run the app

```bash
npm install
npm run start:dev
```

The API listens on `http://localhost:3000`.

## End-to-end tests

```bash
npm run test:e2e
```

## API Endpoints

- `POST /users` register a new user
- `POST /auth/login` obtain a JWT token
- `GET /posts` list posts (requires `Authorization: Bearer <token>`)
- `POST /posts` create a post (requires token)
- `GET /users` list all users (requires token)
