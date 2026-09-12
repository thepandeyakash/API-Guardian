
# 🚀 API Guardian

> **AI-Powered API Monitoring & Security Platform** — continuously monitor API health, detect incidents, perform automated security audits, and get AI-powered vulnerability explanations with remediation recommendations.

![Status](https://img.shields.io/badge/status-active-success)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![Queue](https://img.shields.io/badge/queue-BullMQ-red)
![Cache](https://img.shields.io/badge/cache-Redis-red)
![AI](https://img.shields.io/badge/AI-Gemini-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)

---

## 🌐 Live Demo

### Frontend
https://api-guardian-chi.vercel.app

### Backend API
https://api-guardian-5t9l.onrender.com

### Demo Credentials

```text
Email: test@test.com
Password: 12345678
````

---

## 📖 Overview

API Guardian is a full-stack observability and API security platform built for developers who need visibility into the reliability, performance, and security of their APIs.

It allows users to register API endpoints, continuously monitor their health, track response latency and status codes, detect downtime incidents, and receive dashboard alerts when endpoints fail or recover.

API Guardian also provides automated security audits that inspect API security configurations such as HTTPS, security headers, and CORS. Detected vulnerabilities are scored and analyzed using Google Gemini to provide understandable explanations and actionable remediation recommendations.

The application follows a production-style architecture using asynchronous background processing with **BullMQ and Redis**, persistent data storage with **PostgreSQL and Prisma**, and a modern React dashboard.

---

# ✨ Features

## 🔐 Authentication

* JWT-based authentication
* Secure password hashing with bcrypt
* Protected API routes
* User-specific projects and endpoints
* Persistent authentication state

## 📊 API Monitoring

* Add and manage API endpoints
* Manual health checks
* Background monitoring through BullMQ
* HTTP status monitoring
* Response latency tracking
* Response size tracking
* Expected status code validation
* Historical monitoring logs
* Uptime analytics
* Health percentage calculation

## 🚨 Incident Management

* Automatic downtime detection
* Open incident creation
* Failure count tracking
* Error message tracking
* Incident recovery detection
* Automatic incident closure
* Downtime duration calculation

## 🔔 Alerting

* Endpoint-down alerts
* Endpoint-recovered alerts
* Security risk alerts
* Dashboard alert history
* Read/unread alert tracking

## 🛡️ Security Auditing

API Guardian performs automated security checks including:

* HTTPS configuration
* HTTP Strict Transport Security (HSTS)
* Content Security Policy (CSP)
* X-Frame-Options
* X-Content-Type-Options
* CORS configuration
* Security score calculation

## 🤖 AI-Powered Security Analysis

Security vulnerabilities are analyzed using Google Gemini to generate:

* Vulnerability explanations
* Security impact information
* Recommended remediation
* Suggested fixes
* Developer-friendly security guidance

## 📈 Analytics & Reporting

* Monitoring history
* Uptime percentage
* Health percentage
* Average latency
* Successful vs failed checks
* Security scores
* Security issue history
* Incident history
* Endpoint performance analytics
* Reports dashboard

---

# 🏗️ System Architecture

```text
                         React Frontend
                              │
                              │ REST API
                              ▼
                       Express API Server
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
            PostgreSQL      Redis       Gemini AI
                 │            │
                 │         BullMQ
                 │            │
                 │      ┌─────┴─────┐
                 │      │           │
                 │      ▼           ▼
                 │ Monitoring    Security
                 │   Worker       Worker
                 │      │           │
                 └──────┴───────────┘
                        │
                        ▼
                  Stored Results
                        │
                        ▼
                  React Dashboard
```

---

# 🔄 Core Workflows

## Monitoring Workflow

```text
User / Scheduler
       │
       ▼
BullMQ Monitoring Queue
       │
       ▼
Monitoring Worker
       │
       ▼
HTTP Health Check
       │
       ├───────────────┐
       ▼               ▼
Monitoring Log    Endpoint Status
       │               │
       └───────┬───────┘
               ▼
        Incident Detection
               │
               ▼
             Alert
               │
               ▼
        Dashboard Analytics
```

## Security Workflow

```text
User Starts Security Scan
          │
          ▼
   Create Security Scan
          │
          ▼
    BullMQ Security Queue
          │
          ▼
     Security Worker
          │
          ▼
   Analyze API Endpoint
          │
          ├── HTTPS
          ├── HSTS
          ├── CSP
          ├── X-Frame-Options
          ├── X-Content-Type-Options
          └── CORS
          │
          ▼
   Calculate Security Score
          │
          ▼
    Detect Vulnerabilities
          │
          ▼
       Gemini AI
          │
          ▼
 AI Explanation + Suggested Fix
          │
          ▼
      Store Results
          │
          ▼
     Security Dashboard
```

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* React Router
* React Query
* Zustand
* Tailwind CSS
* shadcn/ui
* Recharts
* Axios
* Vercel

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT
* bcrypt
* BullMQ
* Redis
* Render

## AI

* Google Gemini API

---

# 📂 Project Structure

```text
API-Guardian/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── store/
│   │
│   └── ...
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── jobs/
│   │   │   ├── queues/
│   │   │   ├── schedulers/
│   │   │   └── workers/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── project/
│   │   │   ├── endpoint/
│   │   │   ├── monitoring/
│   │   │   ├── security/
│   │   │   ├── alerts/
│   │   │   └── reports/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── ...
│
├── docs/
│   └── screenshots/
│
└── README.md
```

---

# 🗄️ Database Design

The main database entities are:

```text
User
 │
 └── Project
       │
       └── Endpoint
             │
             ├── MonitoringLog
             ├── Incident
             │     └── Alert
             │
             └── SecurityScan
                    │
                    └── SecurityIssue
```

### Core Models

* `User`
* `Project`
* `Endpoint`
* `MonitoringLog`
* `Incident`
* `Alert`
* `SecurityScan`
* `SecurityIssue`

PostgreSQL is accessed through Prisma ORM.

---

# ⚙️ Background Processing

API Guardian uses **BullMQ + Redis** to handle asynchronous workloads.

### Monitoring Queue

Responsible for:

* Endpoint health checks
* Response measurements
* Monitoring log creation
* Incident detection
* Recovery detection
* Alert generation

### Security Queue

Responsible for:

* Security scans
* Header analysis
* Security scoring
* Vulnerability creation
* Gemini AI analysis
* Security alerts

This keeps expensive and recurring tasks outside the main HTTP request lifecycle.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/thepandeyakash/API-Guardian.git
cd API-Guardian
```

---

# 🖥️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/api_guardian

JWT_SECRET=your_jwt_secret

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

GEMINI_API_KEY=your_gemini_api_key
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

---

# 🔴 Redis Setup

API Guardian uses Redis for BullMQ background jobs.

### Using Docker

```bash
docker run -d \
  --name redis_api_guardian \
  -p 6379:6379 \
  redis
```

Check that Redis is running:

```bash
docker ps
```

The backend should report:

```text
✅ Redis connected
```

---

# 🌐 Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will be available through the Vite development server.

---

# 🔑 Environment Variables

The backend requires the following configuration:

| Variable         | Description                  |
| ---------------- | ---------------------------- |
| `NODE_ENV`       | Application environment      |
| `PORT`           | Backend server port          |
| `DATABASE_URL`   | PostgreSQL connection string |
| `JWT_SECRET`     | JWT signing secret           |
| `REDIS_HOST`     | Redis hostname               |
| `REDIS_PORT`     | Redis port                   |
| `REDIS_PASSWORD` | Redis password if required   |
| `GEMINI_API_KEY` | Google Gemini API key        |

> Never commit `.env` files or API keys to the repository.

---

# 🧪 Build

Build the backend:

```bash
cd server
npm run build
```

Start the production build:

```bash
npm start
```

---

# 📸 Screenshots

## Dashboard

![Dashboard](docs/Screenshots/Dashboard.png)

## Projects

![Projects](docs/Screenshots/Projects.png)

## Endpoint Details

![Endpoint Details](docs/Screenshots/endpoint.png)

## Security Dashboard

![Security Dashboard](docs/Screenshots/security.png)

## Reports Dashboard

![Reports Dashboard](docs/Screenshots/report.png)

## Custom 404 Page

![404 Page](docs/Screenshots/404.png)

---

# 🧑‍💻 Demo Flow

You can explore the application using the following workflow:

```text
1. Register / Login
        ↓
2. Create a Project
        ↓
3. Add an API Endpoint
        ↓
4. Run a Health Check
        ↓
5. View Monitoring Logs
        ↓
6. Simulate / Detect an Incident
        ↓
7. Review Dashboard Alerts
        ↓
8. Start a Security Scan
        ↓
9. Review Security Vulnerabilities
        ↓
10. View AI Recommendations
        ↓
11. Explore Analytics & Reports
```

---

# 🎯 Project Highlights

### Production-Style Architecture

* Modular Express backend
* RESTful API structure
* Prisma-based data layer
* JWT authentication
* Redis-backed asynchronous processing

### Asynchronous Job Processing

BullMQ workers separate background workloads from the main API server, allowing monitoring and security operations to run independently.

### API Observability

The platform tracks:

* Availability
* Status codes
* Latency
* Response size
* Health status
* Incident history

### Automated Security Analysis

The security worker evaluates API configurations and generates a security score based on detected vulnerabilities.

### AI-Assisted Remediation

Gemini provides contextual explanations and suggested fixes rather than simply reporting raw security findings.

### Analytics

Historical monitoring and security data are transformed into useful metrics for understanding API reliability and security posture.

---

# 📚 Lessons Learned

Building API Guardian provided practical experience with:

* Full-stack application architecture
* REST API development
* TypeScript
* PostgreSQL database design
* Prisma ORM
* JWT authentication
* Redis
* BullMQ
* Background workers
* Queue-based architectures
* API observability
* Incident management
* Security auditing
* AI API integration
* React state management
* Data visualization
* Production deployment
* Cloud infrastructure

---

# 🔮 Future Improvements

Potential future improvements include:

* Email and webhook notifications
* More advanced API security checks
* Scheduled security scans
* Custom monitoring intervals
* Rate-limit monitoring
* API response body validation
* OpenAPI/Swagger integration
* Distributed worker deployments
* More notification channels
* Role-based team access
* Advanced anomaly detection
* Historical security score tracking

---

# 👨‍💻 Author

**Akash Pandey**

API Guardian is a flagship portfolio project demonstrating full-stack software engineering, API observability, asynchronous distributed processing, security analysis, and AI-assisted developer tooling.

---

# ⭐ Support

If you find API Guardian interesting, consider giving the repository a ⭐ on GitHub!

