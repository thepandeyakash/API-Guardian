# 🚀 API Guardian

> An AI-Powered API Monitoring & Security Platform that continuously monitors API health, detects incidents, performs automated security audits, and provides AI-powered vulnerability analysis with remediation recommendations.

![Status](https://img.shields.io/badge/status-active-success)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![Queue](https://img.shields.io/badge/queue-BullMQ-red)
![AI](https://img.shields.io/badge/AI-Gemini-orange)

---

## 📖 Overview

API Guardian is a full-stack observability and security platform designed to help developers monitor API availability, detect incidents, analyze performance trends, and identify security vulnerabilities.

The platform performs automated API health checks and security scans, stores historical analytics, generates incident reports, and leverages AI to explain security vulnerabilities and recommend fixes.

This project was built as a production-style SaaS application with asynchronous workers, real-time analytics dashboards, security auditing, and AI-assisted remediation.

---

## 🌐 Live Demo

### Frontend
🔗 https://api-guardian-chi.vercel.app

### Backend API
🔗 https://api-guardian-production-00b2.up.railway.app

### Demo Credentials (Optional)
```text
Email: test@test.com
Password: 12345678
```

## ✨ Features

### 🔐 Authentication
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes
- User-specific projects and endpoints

### 📊 API Monitoring
- Continuous endpoint monitoring
- Response time tracking
- Status code validation
- Health check history
- Availability calculation
- Uptime analytics

### 🚨 Incident Management
- Automatic incident detection
- Downtime tracking
- Incident duration calculation
- Incident recovery detection
- Historical incident analytics

### 🔔 Alerting System
- Endpoint down alerts
- Endpoint recovered alerts
- Security alerts
- Alert history
- Alert status tracking

### 🛡️ Security Auditing
- Security header validation
- CORS misconfiguration detection
- Authentication weakness detection
- TLS/SSL validation
- Security scoring

### 🤖 AI Security Analysis
- AI-generated vulnerability explanations
- AI-generated remediation recommendations
- Business impact analysis
- Security best practice recommendations

### 📈 Analytics & Reporting
- Uptime trends
- Latency trends
- Incident trends
- Security analytics
- Historical reports
- Endpoint performance metrics

---

# 🏗️ System Architecture

```text
                    Frontend
               React + TypeScript
                        |
                        v
                Express API Server
                        |
         +--------------+--------------+
         |                             |
         v                             v
    PostgreSQL                    Redis
         |                             |
         |                         BullMQ
         |                             |
         +-----------+-----------------+
                     |
                     v
                 Workers
             /             \
             v              v
       Monitoring      Security
          Worker         Worker
                             |
                             v
                         Gemini AI
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- React Router
- React Query
- Zustand
- Tailwind CSS
- shadcn/ui
- Recharts
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- BullMQ
- Redis

## AI

- Google Gemini API

---

# 📂 Project Structure

```bash
API-Guardian/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── layouts/
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── modules/
│   │   ├── jobs/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│
└── docs/
```

---

# ⚙️ Core Workflow

## Monitoring Workflow

```text
Scheduler
     ↓
BullMQ Queue
     ↓
Monitoring Worker
     ↓
HTTP Request
     ↓
Store Monitoring Log
     ↓
Detect Incident
     ↓
Generate Alert
```

---

## Security Workflow

```text
Security Scan Request
          ↓
BullMQ Queue
          ↓
Security Worker
          ↓
Analyze Endpoint
          ↓
Detect Vulnerabilities
          ↓
Generate Security Issues
          ↓
Gemini AI Analysis
          ↓
Store AI Explanation
```

---

# 📸 Screenshots

## Dashboard

![Dashboard](docs/screenshots/dashboard.png)

---

## Projects

![Projects](docs/screenshots/projects.png)

---

## Endpoint Details

![Endpoint](docs/screenshots/endpoint.png)

---

## Security Dashboard

![Security](docs/screenshots/security.png)

---

## Reports Dashboard

![Reports](docs/screenshots/report.png)

---

## Custom 404 Page

![404](docs/screenshots/404.png)

---

# 🚀 Installation

## Clone repository

```bash
git clone https://github.com/thepandeyakash/API-Guardian.git
cd api-guardian
```

---

## Backend

```bash
cd server

npm install

cp .env.example .env

npx prisma migrate dev

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Redis

Start the Redis queue via Docker:

```bash
docker start redis-api-guardian
```

(If running for the first time on a new machine):

```bash
docker run -d --name redis_api_guardian -p 6379:6379 redis
```

---

## Demo Flow

1. Register/Login
2. Create Project
3. Add Endpoint
4. Monitor API Health
5. Detect Incidents
6. Perform Security Scan
7. Analyze AI Recommendations
8. Review Reports

---

# 🗄️ Database Schema

Core entities:

- User
- Project
- Endpoint
- MonitoringLog
- Incident
- Alert
- SecurityScan
- SecurityIssue

---

# 🎯 Key Highlights

- Full-stack SaaS architecture
- Asynchronous processing using BullMQ
- Queue-based monitoring engine
- Automated security auditing
- AI-powered vulnerability analysis
- Historical analytics and reporting
- Production-style dashboard UI
- Scalable service architecture

---

# 📚 Lessons Learned

During development of API Guardian, I gained practical experience with:

- Full-stack application architecture
- Asynchronous job processing
- Queue-based systems
- Database design
- API observability
- Security auditing
- AI integration
- Frontend state management
- Dashboard design
- Production system design patterns

---

# 👨‍💻 Author

**Akash Pandey**

Built as a flagship portfolio project demonstrating full-stack software engineering, observability systems, security analysis, and AI integration.

---

# ⭐ If you like this project, consider giving it a star!