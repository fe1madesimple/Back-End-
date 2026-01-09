# FE-1 Made Simple - Backend API

> Secure and scalable backend with AI-assisted feedback services for the Irish FE-1 examination preparation platform.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)](https://www.prisma.io/)

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
- **Paystack payment integration** for subscriptions
- **Cloudinary CDN** for media asset delivery

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
- **ORM:** Prisma 5.x (with migrations)

### Key Libraries

- **Authentication:** Passport (JWT, Google OAuth)
- **Payment:** Paystack SDK
- **Validation:** Joi / Express-Validator
- **CDN/File Storage:** Cloudinary SDK
- **AI/ML:** OpenAI SDK / Anthropic SDK
- **Email:** Brevo (formerly Sendinblue) SDK
- **Logging:** Winston
- **Documentation:** Swagger (OpenAPI 3.0)
- **Testing:** Jest + Supertest

### DevOps

- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Cloud:** Digital Ocean (Droplets + Managed Databases)
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

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/fe1_db

# Prisma
PRISMA_HIDE_UPDATE_MESSAGE=true

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Paystack
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_MONTHLY_PLAN_CODE=PLN_xxxxxxxxxxxxxx
PAYSTACK_ANNUAL_PLAN_CODE=PLN_xxxxxxxxxxxxxx

# Cloudinary (CDN & File Storage)
CLOUDINARY_CLOUD_NAME=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_UPLOAD_PRESET=fe1_uploads

# OpenAI / LLM Provider
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LLM_PROVIDER=openai
LLM_MODEL=gpt-4-turbo-preview
LLM_MAX_TOKENS=2000
LLM_TEMPERATURE=0.7

# Brevo Email (formerly Sendinblue)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@fe1madesimple.ie
BREVO_SENDER_NAME=FE-1 Made Simple

# Client URLs
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Logging
LOG_LEVEL=debug

# Digital Ocean Spaces (Optional - if using DO Spaces alongside Cloudinary)
DO_SPACES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DO_SPACES_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DO_SPACES_ENDPOINT=https://fra1.digitaloceanspaces.com
DO_SPACES_BUCKET=fe1-made-simple
DO_SPACES_REGION=fra1
```

3. **Set up the database:**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed initial data (optional)
npx prisma db seed

# Open Prisma Studio (Database GUI)
npx prisma studio
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
│   │   │   ├── routes/             # Express routes
│   │   │   ├── validators/         # Input validation
│   │   │   └── interfaces/         # TypeScript interfaces
│   │   ├── subscription/           # Paystack subscriptions
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
│   │   └── constants/              # Constants & enums
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
├── prisma/                         # Prisma ORM
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Database migrations
│   └── seed.ts                     # Seed data script
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
Staging:     https://staging-api.fe1madesimple.ie/api/v1
Production:  https://api.fe1madesimple.ie/api/v1
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
- [ ] `POST /initialize` - Initialize Paystack payment
- [ ] `GET /verify/:reference` - Verify Paystack transaction
- [ ] `POST /webhook` - Paystack webhook handler
- [ ] `GET /status` - Check subscription status
- [ ] `POST /cancel` - Cancel subscription
- [ ] `POST /resume` - Resume subscription
- [ ] `GET /transactions` - List user transactions

#### 3. Content (`/api/v1/content`)

- [ ] `GET /subjects` - List all subjects
- [ ] `GET /subjects/:id` - Get subject details
- [ ] `GET /subjects/:id/modules` - List modules in subject
- [ ] `GET /modules/:id` - Get module details
- [ ] `GET /modules/:id/lessons` - List lessons in module
- [ ] `GET /lessons/:id` - Get lesson details
- [ ] `GET /lessons/:id/assets` - Get lesson assets (Cloudinary URLs)
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

**Planned Models (Prisma):**
- `User`
- `Subscription`
- `Subject`
- `Module`
- `Lesson`
- `LessonAsset`
- `Question`
- `TimedSession`
- `QuizAttempt`
- `AIEvaluation`
- `CaseBrief`
- `StudyLog`
- `Announcement`

### Migrations

Create new migration:
```bash
npx prisma migrate dev --name create-users-table
```

Run migrations (production):
```bash
npx prisma migrate deploy
```

Reset database (development only):
```bash
npx prisma migrate reset
```

View migration status:
```bash
npx prisma migrate status
```

### Database Studio

Open Prisma Studio to view/edit data:
```bash
npx prisma studio
```

### Seeds

Seed database with test data:
```bash
npx prisma db seed
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

- [ ] Environment variables configured on Digital Ocean
- [ ] Prisma migrations run on production database
- [ ] SSL certificates installed (Let's Encrypt)
- [ ] Redis cache configured (DO Managed Redis)
- [ ] Paystack webhooks tested in live mode
- [ ] Cloudinary upload presets configured
- [ ] Brevo email templates created
- [ ] OWASP security scan passed
- [ ] Load testing completed
- [ ] Monitoring and alerting set up
- [ ] Backup strategy implemented (DO automated backups)
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
| **M2** | Auth & subscription (Email/Google, roles, Paystack) | 11-14 Jan 2025 | 🔴 Pending |
| **M3** | Content services (CRUD, versioning, search) | 15-27 Jan 2025 | 🔴 Pending |
| **M4** | Timed assessments (Past Questions, sessions, MCQ) | 28 Jan - 13 Feb 2025 | 🔴 Pending |
| **M5** | AI feedback integration (LLM IRAC/ILAC rubric) | 13-22 Feb 2025 | 🔴 Pending |
| **M6** | Payments & hardening (Paystack lifecycle, security, runbook) | 22-28 Feb 2025 | 🔴 Pending |

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

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** 🚧 In Development