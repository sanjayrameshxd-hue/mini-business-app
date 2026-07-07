# Mini Business Operations App
A 4-week full-stack internship project using React, Tailwind CSS, Node.js,
Express, PostgreSQL, Prisma, GitHub, automated tests, and deployment practices.
## Business Goal
This application manages a simplified business workflow:
- Product management
- Customer management
- Sales order creation
- Sales order line items
- Backend total calculation
- Stock validation
- Order confirmation
- Stock movement tracking
## Planned Modules
- Dashboard
- Products
- Customers
- Sales Orders
- Stock Movements
## Tech Stack
### Frontend
- React
- Tailwind CSS
- React Router
### Backend
- Node.js
- Express.js
- Prisma ORM
### Database
- PostgreSQL

## Prisma Setup

## Database Setup

This project uses PostgreSQL.

Database name:
mini_business_app

Run:

SELECT version();

### Engineering Workflow
- Git
- GitHub
- Pull requests
- Automated tests
- GitHub Actions
- Hostinger deployment

## Week 3 Business Flow Test Scenarios
### Backend API tests
Run backend tests:
```powershell
cd backend
npm test
```

## CI and Deployment Readiness
This project uses GitHub Actions for CI.
The CI workflow runs on pull requests and pushes to `main`.
CI checks include:
- Backend unit tests
- Backend integration tests with a temporary PostgreSQL service container
- Prisma Client generation
- Prisma migrations against the CI test database
- Frontend tests
- Frontend production build
Backend unit tests do not start PostgreSQL, but the unit test job still p
Backend integration tests use a temporary PostgreSQL database created by
CI must never use the production database.
Deployment workflow files are placeholders only. Real Hostinger credentia
Required deployment secrets may include:
- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_PORT`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_BACKEND_PATH`
- `HOSTINGER_FRONTEND_PATH`
- `PRODUCTION_DATABASE_URL`
- `PRODUCTION_API_BASE_URL`