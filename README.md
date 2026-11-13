# JWT Authentication API — Node.js, Express and Sequelize

A learning/demo API for user registration and login with Express, MySQL, Sequelize, bcrypt password hashing and JSON Web Tokens.

## Endpoints

| Method | Route | Behavior |
| --- | --- | --- |
| POST | `/users/sign-in` | Register an account (historical route name) |
| POST | `/users/login` | Verify credentials and return a JWT |

Example registration:

```bash
curl -X POST http://localhost:3000/users/sign-in \
  -H "Content-Type: application/json" \
  -d '{"name":"Example User","email":"example@example.com","password":"choose-a-unique-password"}'
```

## Local setup

1. Install Node.js and start a local MySQL server.
2. Run `npm install`.
3. Create an empty MySQL database (e.g. `jwt_demo`) and a **least-privilege** local database user.
4. Copy `cp .env.example .env` and replace all placeholders. A `.env` file is **not loaded automatically** by this app.
5. On macOS/Linux, load it into your shell with `set -a; source .env; set +a`.
6. Run `npm start`. The demo listens on port `3000`.

Required environment variables: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`. Optional: `DB_HOST` (defaults to `localhost`). `JWT_SECRET` must be at least 32 characters.

## Security improvements in this branch

- Replaces hardcoded database login and JWT signing secret with environment configuration.
- Validates minimum registration inputs and hashes new passwords with bcrypt.
- Returns generic error responses instead of exposing raw database errors.
- Issues a JWT with a one-hour expiry.

## Before production

This is **not** production-ready: add proper request rate limiting, database-level uniqueness, tests, token revocation/rotation, HTTPS, secure monitoring and a full dependency/security review. Historical commits may still contain development secrets; rotate any potentially live values. Never deploy with the example settings.

**Abishek Paudel** · [Portfolio](https://abishekpaudel.com.np) · [LinkedIn](https://www.linkedin.com/in/abishekpaudel/)
