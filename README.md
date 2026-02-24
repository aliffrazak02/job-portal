# Job Portal

UBCO COSC 360 W25-26 — Team 21

A full-stack job portal connecting job seekers and employers, built with the MERN stack and containerized with Docker.


## Team Members

- Mandira Samarasekara
- Mohammad Kalam
- Prashaant Mudgala
- Aliff Iman bin Abdul Razak


## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React 18, Vite 5, React Router v6       |
| Backend     | Node.js 20, Express 4                   |
| Database    | MongoDB 7 (Mongoose ODM)                |
| Auth        | JWT (jsonwebtoken + bcryptjs)           |
| API Docs    | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| Testing     | Vitest, React Testing Library, Playwright |
| Containers  | Docker, Docker Compose                  |
| CI          | GitHub Actions                          |


## Design

### [Link to Figma Design](https://www.figma.com/design/pN6y7n9w8iuzyNwl7LCAIr/COSC-360-Team-21?node-id=0-1&t=v20ubt4Gaw9ERY0n-1)

### [Link to Project Proposal](https://docs.google.com/document/d/1c10n0hHMnWpSCflJovaTtLj3A2yDhzrI57MiKA3xlSA/edit?usp=sharing)

### User Roles

| Role        | Description                                  |
|-------------|----------------------------------------------|
| `jobseeker` | Default role — browses and applies for jobs  |
| `employer`  | Posts and manages job listings               |
| `admin`     | Manage job board analytics                   |


### Project Structure

```
job-portal/
├── .github/workflows/ci.yml      # GitHub Actions (lint → test → e2e)
├── backend/
│   ├── src/
│   │   ├── __tests__/            # Vitest test suite
│   │   │   ├── setup.js          # MongoMemoryServer + env setup
│   │   │   ├── health.test.js
│   │   │   └── auth.test.js
│   │   ├── app.js                # Express app factory (imported by tests)
│   │   ├── config/
│   │   │   ├── db.js             # Mongoose connection
│   │   │   └── swagger.js        # OpenAPI 3.0 spec + schema definitions
│   │   ├── controllers/          # Route handler logic
│   │   ├── middleware/           # JWT auth guard
│   │   ├── models/               # Mongoose schemas
│   │   └── routes/               # Express routers (with @swagger JSDoc)
│   ├── server.js                 # Entry point (connect DB + listen)
│   └── vitest.config.js
├── frontend/
│   ├── src/
│   │   ├── __tests__/            # Vitest + RTL test suite
│   │   │   └── App.test.jsx
│   │   ├── App.jsx               # Route definitions
│   │   ├── main.jsx              # React root
│   │   └── setupTests.js         # jest-dom + warning suppression
│   └── vite.config.js            # Dev server + API proxy
├── e2e/                          # Playwright end-to-end tests
│   ├── playwright.config.js
│   └── tests/auth.spec.js
├── docker-compose.yml
├── Makefile                      # Developer task runner
└── .env.example
```

## Quick Start

```bash
git clone <repo-url> && cd job-portal
cp .env.example .env
make up
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development guide, testing instructions, and contribution workflow.
