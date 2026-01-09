# FE-1 Made Simple - Backend API

> Secure and scalable backend with AI-assisted feedback services for the Irish FE-1 examination preparation platform.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Modules](#modules)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Development Timeline](#development-timeline)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**FE-1 Made Simple** is an education technology platform that prepares candidates for the Irish FE-1 examinations. This repository contains the backend API that powers the platform with:

- 🔐 Secure authentication and authorization
- 💳 Stripe subscription management
- 📚 Content management system with versioning
- ⏱️ Timed assessment engine
- 🤖 AI-powered essay feedback (IRAC/ILAC methodology)
- ⚖️ Case law library with hybrid search
- 📊 Analytics and progress tracking
- 👨‍💼 Comprehensive admin console

### Key Features

- **Email & Google OAuth** authentication
- **Role-based access control** (Student, Host, Admin)
- **Trial logic** and subscription entitlements
- **Past question bank** with year/subject/topic tagging
- **Timed sessions** with auto-save and integrity checks
- **LLM-powered feedback** on legal essays
- **CSV ingestion pipeline** for case briefs
- **Study analytics** (time tracking, streaks, readiness scores)

---

## 🏗️ Architecture

This project uses a **monolithic microservices architecture**, where each module is self-contained but deployed as a single application.

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                           │
│                  (Express + Middleware)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐   ┌───────▼────────┐
│  Auth Module   │  │   Content   │   │   Assessment   │
│                │  │   Module    │   │     Module     │
└────────────────┘  └─────────────┘   └────────────────┘
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐   ┌───────▼────────┐
│ Subscription   │  │ AI Feedback │   │   Case Law     │
│    Module      │  │   Module    │   │    Module      │
└────────────────┘  └─────────────┘   └────────────────┘
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐
│   Analytics    │  │    Admin    │
│    Module      │  │    Module   │
└────────────────┘  └─────────────┘
        │                   │
        └───────────────────┼───────────────────┘
                            │
                ┌───────────▼───────────┐
                │   PostgreSQL + Redis   │
                └───────────────────────┘
```

### Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| **Auth** | User authentication, JWT tokens, password reset |
| **Subscription** | Stripe integration, trial logic, entitlements |
| **Content** | CRUD for subjects/modules/lessons with versioning |
| **Assessment** | Past questions, timed sessions, MCQ scoring |
| **AI Feedback** | LLM integration for essay evaluation (IRAC/ILAC) |
| **Case Law** | CSV ingestion, hybrid search, citations |
| **Analytics** | Study time, streaks, quiz accuracy, readiness |
| **Admin** | User management, content management, reporting |

---

## 🛠️ Tech Stack

### Core

- **Runtime:** Node.js 20.x
- **Framework:** Express.js 4.x
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL 16
- **Cache:** Redis 7.x
- **ORM:** Sequelize (with migrations)

### Key Libraries

- **Authentication:** Passport (JWT, Google OAuth)
- **Payment:** Stripe SDK
- **Validation:** Joi / Express-Validator
- **File Storage:** AWS S3 SDK / Azure Storage
- **AI/ML:** OpenAI SDK / Anthropic SDK
- **Email:** Nodemailer
- **Logging:** Winston
- **Documentation:** Swagger (OpenAPI 3.0)
- **Testing:** Jest + Supertest

### DevOps

- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Cloud:** Digital OCean 
- **Monitoring:** Structured logs + metrics hooks

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 20.x 
- **npm** >= 10.x
- **PostgreSQL** >= 16.x
- **Redis** >= 7.x
- **Docker** (optional, for containerized development)
- **Git**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/fe1-made-simple/backend.git
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

### Environment Setup

1. **Copy the example environment file:**

```bash
cp .env.example .env
```

2. **Configure your `.env` file with the following variables:**

```env
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
DATABASE_URL=xxxxxx
DB_HOST=xxxxxx
DB_PORT=xxxxx
DB_NAME=xxxxxx
DB_USER=xxxxxx
DB_PASSWORD=xxxxxx
DB_POOL_MIN=xx
DB_POOL_MAX=xx

# Redis
REDIS_URL=xxxxx
REDIS_HOST=xxxxx
REDIS_PORT=xxxxx
REDIS_PASSWORD=xxxxx

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_ANNUAL_PRICE_ID=price_xxxxx

# OpenAI / LLM Provider
OPENAI_API_KEY=sk-your-openai-api-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
LLM_PROVIDER=openai
LLM_MODEL=gpt-4-turbo-preview
LLM_MAX_TOKENS=2000
LLM_TEMPERATURE=0.7

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=fe1-made-simple-assets

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@fe1madesimple.com

# Client URLs
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Logging
LOG_LEVEL=debug
```

3. **Set up the database:**

```bash
# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### Running Locally

**Development mode (with hot-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

**Using Docker Compose:**

```bash
docker-compose up -d
```

The API will be available at: `http://localhost:5000`

Swagger documentation: `http://localhost:5000/api-docs`

---

## 📁 Project Structure

```
fe1-backend/
├── src/
│   ├── modules/                    # Feature modules
│   │   ├── auth/                   # Authentication & authorization
│   │   │   ├── controllers/        # Route controllers
│   │   │   ├── services/           # Business logic
│   │   │   ├── models/             # Database models
│   │   │   ├── routes/             # Express routes
│   │   │   ├── validators/         # Input validation
│   │   │   └── interfaces/         # TypeScript interfaces
│   │   ├── subscription/           # Stripe subscriptions
│   │   ├── content/                # Content management
│   │   ├── assessment/             # Timed assessments & MCQs
│   │   ├── ai-feedback/            # LLM essay feedback
│   │   ├── case-law/               # Case law library
│   │   ├── analytics/              # Study analytics
│   │   └── admin/                  # Admin console APIs
│   ├── shared/                     # Shared utilities
│   │   ├── config/                 # Configuration files
│   │   ├── middleware/             # Express middleware
│   │   ├── utils/                  # Helper functions
│   │   ├── types/                  # Global TypeScript types
│   │   ├── constants/              # Constants & enums
│   │   └── database/               # Database connection & migrations
│   │       ├── migrations/         # Sequelize migrations
│   │       └── seeds/              # Database seed files
│   ├── swagger/                    # API documentation
│   │   ├── schemas/                # OpenAPI schemas
│   │   └── docs/                   # Additional docs
│   ├── tests/                      # Test files
│   │   ├── unit/                   # Unit tests
│   │   ├── integration/            # Integration tests
│   │   └── e2e/                    # End-to-end tests
│   ├── scripts/                    # Utility scripts
│   ├── logs/                       # Application logs
│   ├── app.ts                      # Express app setup
│   └── server.ts                   # Server entry point
├── .env.example                    # Example environment variables
├── .env                            # Environment variables (git-ignored)
├── .gitignore                      # Git ignore rules
├── package.json                    # NPM dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.js                  # Jest testing configuration
├── docker-compose.yml              # Docker services
├── Dockerfile                      # Docker image
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
└── README.md                       # This file
```

---

## 📚 API Documentation

Full API documentation is available via **Swagger UI** when the server is running:

🔗 **http://localhost:5000/api-docs**

### Base URL

```
Development: http://localhost:5000/api/v1
Staging:     https://staging-api.fe1madesimple.com/api/v1
Production:  https://api.fe1madesimple.com/api/v1
```

### Authentication

Most endpoints require a JWT token in the `Authorization` header:

```http
Authorization: Bearer <your-jwt-token>
```

### API Modules (TO BE DOCUMENTED)

Below is a high-level overview. Detailed endpoint documentation will be added as we build each module.

#### 1. Authentication (`/api/v1/auth`)

- [ ] `POST /register` - Email registration
- [ ] `POST /login` - Email login
- [ ] `GET /google` - Google OAuth initiation
- [ ] `GET /google/callback` - Google OAuth callback
- [ ] `POST /refresh-token` - Refresh access token
- [ ] `POST /forgot-password` - Request password reset
- [ ] `POST /reset-password` - Reset password with token
- [ ] `POST /verify-email` - Verify email address
- [ ] `GET /me` - Get current user profile

#### 2. Subscription (`/api/v1/subscription`)

- [ ] `GET /plans` - List available subscription plans
- [ ] `POST /checkout` - Create Stripe checkout session
- [ ] `POST /webhook` - Stripe webhook handler
- [ ] `GET /status` - Check subscription status
- [ ] `POST /cancel` - Cancel subscription
- [ ] `POST /resume` - Resume subscription
- [ ] `GET /invoices` - List user invoices

#### 3. Content (`/api/v1/content`)

- [ ] `GET /subjects` - List all subjects
- [ ] `GET /subjects/:id` - Get subject details
- [ ] `GET /subjects/:id/modules` - List modules in subject
- [ ] `GET /modules/:id` - Get module details
- [ ] `GET /modules/:id/lessons` - List lessons in module
- [ ] `GET /lessons/:id` - Get lesson details
- [ ] `GET /lessons/:id/assets` - Get lesson assets (signed URLs)
- [ ] `GET /search` - Search across content hierarchy

#### 4. Assessment (`/api/v1/assessment`)

- [ ] `GET /questions` - List past questions (filtered)
- [ ] `POST /sessions/start` - Start timed essay session
- [ ] `POST /sessions/:id/save` - Auto-save session progress
- [ ] `POST /sessions/:id/submit` - Submit session
- [ ] `GET /sessions/:id/history` - Get submission history
- [ ] `GET /quizzes/daily` - Get daily MCQ quiz
- [ ] `POST /quizzes/:id/submit` - Submit quiz answers
- [ ] `GET /quizzes/history` - Quiz history with scores

#### 5. AI Feedback (`/api/v1/ai-feedback`)

- [ ] `POST /evaluate` - Submit essay for AI evaluation
- [ ] `GET /evaluations/:id` - Get evaluation results
- [ ] `GET /evaluations/history` - User's evaluation history

#### 6. Case Law (`/api/v1/case-law`)

- [ ] `GET /search` - Hybrid search (lexical + embeddings)
- [ ] `GET /:id` - Get case brief details
- [ ] `GET /:id/related` - Get related cases
- [ ] `GET /citations` - Export citations used in feedback

#### 7. Analytics (`/api/v1/analytics`)

- [ ] `GET /dashboard` - User dashboard stats
- [ ] `GET /study-time` - Study time breakdown
- [ ] `GET /streaks` - Current and best streaks
- [ ] `GET /quiz-accuracy` - Quiz performance metrics
- [ ] `GET /readiness/:paper` - Readiness score per paper

#### 8. Admin (`/api/v1/admin`)

- [ ] `GET /users` - List all users (paginated)
- [ ] `GET /users/:id` - Get user details
- [ ] `PUT /users/:id` - Update user
- [ ] `DELETE /users/:id` - Delete user
- [ ] `POST /content/subjects` - Create subject
- [ ] `PUT /content/subjects/:id` - Update subject
- [ ] `DELETE /content/subjects/:id` - Delete subject
- [ ] `POST /questions/import` - Bulk import questions
- [ ] `GET /reports/cohort` - Cohort analytics
- [ ] `POST /announcements` - Create announcement

---

## 🧩 Modules

### Module Development Status

| Module | Status | Progress |
|--------|--------|----------|
| Auth | 🔴 Not Started | 0% |
| Subscription | 🔴 Not Started | 0% |
| Content | 🔴 Not Started | 0% |
| Assessment | 🔴 Not Started | 0% |
| AI Feedback | 🔴 Not Started | 0% |
| Case Law | 🔴 Not Started | 0% |
| Analytics | 🔴 Not Started | 0% |
| Admin | 🔴 Not Started | 0% |

**Legend:**
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Completed
- ✅ Tested & Deployed

---

## 🗄️ Database

### Database Schema

*Database schema documentation will be added here as models are created.*

**Planned Tables:**
- `users`
- `subscriptions`
- `subjects`
- `modules`
- `lessons`
- `lesson_assets`
- `questions`
- `timed_sessions`
- `quiz_attempts`
- `ai_evaluations`
- `case_briefs`
- `study_logs`
- `announcements`

### Migrations

Run migrations:
```bash
npm run db:migrate
```

Rollback migration:
```bash
npm run db:migrate:undo
```

Create new migration:
```bash
npm run db:migrate:create --name create-users-table
```

### Seeds

Seed database with test data:
```bash
npm run db:seed
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Coverage Goals

- **Unit Tests:** > 80% line coverage
- **Integration Tests:** All critical API endpoints
- **Security Tests:** OWASP Top 10 checks (no High/Critical issues)

---

## 🚢 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Redis cache configured
- [ ] Stripe webhooks tested in live mode
- [ ] OWASP security scan passed
- [ ] Load testing completed
- [ ] Monitoring and alerting set up
- [ ] Backup strategy implemented
- [ ] Runbook documented

### Deployment Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run with PM2 (process manager)
pm2 start dist/server.js --name fe1-api
```

### Docker Deployment

```bash
# Build image
docker build -t fe1-backend:latest .

# Run container
docker run -p 5000:5000 --env-file .env fe1-backend:latest
```

---

## 📅 Development Timeline

Based on the contract (Schedule 2):

| Phase | Task | Duration | Status |
|-------|------|----------|--------|
| **M1** | Project foundation (repos, CI, DB schemas, OpenAPI) | 5-10 Jan 2025 | 🔴 Pending |
| **M2** | Auth & subscription (Email/Google, roles, Stripe) | 11-14 Jan 2025 | 🔴 Pending |
| **M3** | Content services (CRUD, versioning, search) | 15-27 Jan 2025 | 🔴 Pending |
| **M4** | Timed assessments (Past Questions, sessions, MCQ) | 28 Jan - 13 Feb 2025 | 🔴 Pending |
| **M5** | AI feedback integration (LLM IRAC/ILAC rubric) | 13-22 Feb 2025 | 🔴 Pending |
| **M6** | Payments & hardening (Stripe lifecycle, security, runbook) | 22-28 Feb 2025 | 🔴 Pending |

**Finish Date:** 28 February 2025

---

## 🤝 Contributing

### Team

- **Client:** FE-1 Made Simple (Akintunde Idowu, Temitope Adeyelu)
- **Backend Developer:** Ajayi Victor Damilare

### Development Workflow

1. Create a feature branch from `main`
2. Follow the TypeScript style guide
3. Write tests for new features
4. Update this README with API documentation
5. Submit PR for review

### Code Style

- **Linter:** ESLint with TypeScript rules
- **Formatter:** Prettier
- **Commit Convention:** Conventional Commits

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

---

## 📄 License

This project is proprietary and confidential. All rights reserved by FE-1 Made Simple.

**Copyright © 2025 FE-1 Made Simple. All intellectual property rights belong to FE-1 Made Simple as per the Web Development Agreement dated 5 January 2025.**

---

## 📞 Contact

**Client:**
- Email: fe1madesimple@gmail.com
- Location: Dublin, Ireland

**Developer:**
- Email: victorajayidamilare@gmail.com
- Location: Lagos, Nigeria

---

## 📝 Notes

- **Warranty Period:** 45 days post-deployment for defect remediation
- **Security Compliance:** GDPR, Irish Data Protection Act 2018
- **Response Targets:** 
  - Severity I: 4 hours response, 24 hours restore
  - Severity II: 1 business day response, 3 business days restore

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** 🚧 In Development 