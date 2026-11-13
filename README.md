# JWT Authentication API — Node.js, Express and Sequelize

A **learning/demo** REST API for user registration and login with Express, MySQL, Sequelize, bcrypt password hashing and JSON Web Tokens.

## What's implemented

- `POST /users/sign-in` — user registration (the original route is named `sign-in`, but it registers an account).
- `POST /users/login` — verify credentials and return a signed JWT.
- User model backed by MySQL/Sequelize.
- Password hashing via `bcryptjs`.

## Quick look

```http
POST /users/sign-in
Content-Type: application/json

{"name":"Example User","email":"example@example.com","password":"use-a-unique-password"}
```

```http
POST /users/login
Content-Type: application/json

{"email":"example@example.com","password":"use-a-unique-password"}
```

## Local setup

1. Install Node.js and MySQL.
2. Run `npm install`.
3. Create a local MySQL database.
4. Configure the database connection and JWT signing secret **before running the application**. The original demo contains hardcoded development credentials and a JWT signing string; these must not be used in production.
5. Run `npm start`. The original demo listens on port `3000`.

## Security limitations

This repository is **educational, not production-ready**. Before deploying it, move credentials and JWT secrets to environment variables, add request validation, review token expiration and error handling, use least-privilege database accounts, and add automated security tests. Do not reuse passwords or keys shown in historical Git commits. The sample routes should not be interpreted as a complete authentication platform.

## Author

**Abishek Paudel** — [Portfolio](https://abishekpaudel.com.np) · [LinkedIn](https://www.linkedin.com/in/abishekpaudel/)
