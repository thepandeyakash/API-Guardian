# 🚀 API Guardian

> An AI-powered API Monitoring & Security Platform that continuously monitors API health, detects incidents, performs automated security audits, and provides AI-powered vulnerability analysis with remediation recommendations.

![Status](https://img.shields.io/badge/status-active-success)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![Queue](https://img.shields.io/badge/queue-BullMQ-red)
![Redis](https://img.shields.io/badge/Redis-BullMQ-red)
![AI](https://img.shields.io/badge/AI-Gemini-orange)

---

## 📖 Overview

API Guardian is a full-stack observability and security platform designed to help developers monitor API availability, detect incidents, analyze performance trends, and identify security vulnerabilities.

The platform performs API health checks, stores historical monitoring data, detects downtime incidents, generates alerts, performs automated security audits, and uses Google Gemini AI to explain vulnerabilities and recommend remediation steps.

The project is built using a production-style architecture with:

- React + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database
- Redis + BullMQ for asynchronous job processing
- Dedicated monitoring and security workers
- AI-powered security analysis
- Analytics and reporting dashboards

---

# 🌐 Live Demo

### Frontend

🔗 https://api-guardian-chi.vercel.app

### Backend API

🔗 https://api-guardian-5t9l.onrender.com

### Backend Health Check

```text
GET /

Expected response:

API Guardian backend working.
Demo Credentials
Email: test@test.com
Password: 12345678

Demo credentials may change depending on the current database state.

✨ Features
🔐 Authentication
JWT-based authentication
Secure password hashing using bcrypt
Protected API routes
User-specific projects and endpoints
Authentication middleware
📊 API Monitoring
API endpoint monitoring
HTTP method support
Custom request headers
Expected status code validation
Response latency tracking
Response size tracking
Monitoring history
Uptime analytics
Health status tracking
🚨 Incident Management

API Guardian automatically detects endpoint failures and manages incidents.

Features include:

Automatic incident creation
Failure count tracking
Downtime detection
Incident duration calculation
Automatic incident recovery detection
Incident history
Recovery alerts
🔔 Alerting System

The platform generates alerts for important events.

Supported alerts include:

Endpoint down
Endpoint recovered
Security vulnerabilities
Dashboard alerts
Alert read/unread tracking
Incident-linked alerts
Security-scan-linked alerts
🛡️ Security Auditing

API Guardian performs automated security checks against registered endpoints.

Current checks include:

HTTPS enforcement
HSTS header
Content Security Policy
X-Frame-Options
X-Content-Type-Options
CORS configuration
Security scoring

Security scans generate a score from 0–100 based on detected issues.

🤖 AI-Powered Security Analysis

Security vulnerabilities are analyzed using Google Gemini AI.

For detected vulnerabilities, API Guardian can generate:

Vulnerability explanations
Security impact analysis
Recommended remediation
Suggested fixes
Developer-friendly security guidance

Example workflow:

Security Issue
      ↓
Gemini AI
      ↓
Explanation
      ↓
Recommended Fix
      ↓
Stored in Database
📈 Analytics & Reporting

API Guardian provides historical analytics for monitored endpoints.

Metrics include:

Total checks
Successful checks
Failed checks
Healthy checks
Uptime percentage
Health percentage
Average latency
Monitoring history
Incident trends
Security scan results
Endpoint performance
🏗️ System Architecture
                         Frontend
                    React + TypeScript
                           |
                           | HTTP / REST API
                           v
                    Express API Server
                           |
              +------------+-------------+
              |                          |
              v                          v
        PostgreSQL                     Redis
              |                          |
              |                       BullMQ
              |                          |
              |              +-----------+-----------+
              |              |                       |
              |              v                       v
              |       Monitoring Worker        Security Worker
              |              |                       |
              |              v                       v
              |        API Health Check        Security Audit
              |                                      |
              |                                      v
              |                                  Gemini AI
              |                                      |
              +------------------+-------------------+
                                 |
                                 v
                            Stored Results
⚙️ Core Workflows
Monitoring Workflow
Monitoring Scheduler
        ↓
BullMQ Monitoring Queue
        ↓
Monitoring Worker
        ↓
HTTP Request
        ↓
Measure Response
        ↓
Store Monitoring Log
        ↓
Update Endpoint Status
        ↓
Detect Incident
        ↓
Generate Alert
Manual Monitoring Workflow
User
 ↓
Manual Health Check
 ↓
Express API
 ↓
Monitoring Service
 ↓
BullMQ Monitoring Queue
 ↓
Monitoring Worker
 ↓
HTTP Request
 ↓
Monitoring Result
Security Workflow
User
 ↓
Start Security Scan
 ↓
Express API
 ↓
Security Service
 ↓
Create Security Scan
 ↓
BullMQ Security Queue
 ↓
Security Worker
 ↓
Analyze Endpoint
 ↓
Detect Vulnerabilities
 ↓
Gemini AI
 ↓
Generate Explanation + Fix
 ↓
Store Security Issues
 ↓
Calculate Security Score
 ↓
Generate Alert
🧵 Asynchronous Job Processing

API Guardian uses BullMQ + Redis to process monitoring and security tasks asynchronously.

This prevents long-running operations from blocking normal API requests.

Queues
monitoring
security
Workers
Monitoring Worker
Security Worker

The architecture allows additional background jobs and workers to be added as the platform grows.

📂 Project Structure
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
│   │
│   └── ...
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── project/
│   │   │   ├── endpoint/
│   │   │   ├── monitoring/
│   │   │   ├── security/
│   │   │   ├── alerts/
│   │   │   └── reports/
│   │   │
│   │   ├── jobs/
│   │   │   ├── queues/
│   │   │   ├── schedulers/
│   │   │   └── workers/
│   │   │
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── ...
│
├── docs/
│   └── screenshots/
│
└── README.md
🛠️ Tech Stack
Frontend
React
TypeScript
React Router
React Query
Zustand
Tailwind CSS
shadcn/ui
Recharts
Axios
Backend
Node.js
Express.js
TypeScript
PostgreSQL
Prisma ORM
JWT
bcrypt
BullMQ
Redis
AI
Google Gemini API
Deployment
Frontend: Vercel
Backend: Render
Database: PostgreSQL
Queue / Background Jobs: Redis + BullMQ
🗄️ Database

The application uses PostgreSQL with Prisma ORM.

Core entities
User
Project
Endpoint
MonitoringLog
Incident
Alert
SecurityScan
SecurityIssue
Simplified relationships
User
 |
 +---- Project
         |
         +---- Endpoint
                |
                +---- MonitoringLog
                |
                +---- Incident
                |
                +---- Alert
                |
                +---- SecurityScan
                         |
                         +---- SecurityIssue
🔄 API Monitoring Lifecycle

For every health check, API Guardian records information such as:

Endpoint
   ↓
HTTP Request
   ↓
Status Code
   ↓
Latency
   ↓
Response Size
   ↓
UP / DOWN
   ↓
Healthy / Unhealthy
   ↓
Monitoring Log

The endpoint's latest status is also updated so the dashboard can display its current state.

🛡️ Security Scoring

Security scans start with a score of:

100 / 100

The score is reduced based on detected vulnerabilities.

Example:

HTTPS missing                    -20
HSTS missing                     -20
CSP missing                      -10
X-Frame-Options missing          -10
X-Content-Type-Options missing   -10
Wildcard CORS                    -30

The final score is constrained to:

0–100

Critical security issues can also trigger a dashboard alert.

📸 Screenshots
Dashboard

Projects

Endpoint Details

Security Dashboard

Reports Dashboard

Custom 404 Page

🚀 Local Development
Prerequisites

Make sure you have:

Node.js
npm
PostgreSQL
Redis
Git
Clone Repository
git clone https://github.com/thepandeyakash/API-Guardian.git

cd API-Guardian
Backend Setup
cd server

npm install

Create your environment file:

cp .env.example .env

Configure the required environment variables:

NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://...

JWT_SECRET=your_secret

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

Run Prisma migrations:

npx prisma migrate dev

Generate Prisma Client:

npx prisma generate

Start the backend:

npm run dev
Frontend Setup

Open another terminal:

cd client

npm install

npm run dev
Redis Setup
Using Docker

Run Redis:

docker run -d \
  --name redis-api-guardian \
  -p 6379:6379 \
  redis

Or start an existing Redis container:

docker start redis-api-guardian
🧪 Build Verification

Backend TypeScript can be compiled using:

cd server

npm run build

The project should compile successfully without TypeScript errors.

🚀 Production Deployment

API Guardian is deployed using:

Frontend
   ↓
Vercel

Backend
   ↓
Render

PostgreSQL
   ↓
Production PostgreSQL Database

Redis
   ↓
Production Redis Instance

Background Jobs
   ↓
BullMQ Workers

The production backend requires the following environment configuration:

NODE_ENV=production
PORT=<platform-provided-port>

DATABASE_URL=<production-postgresql-url>

JWT_SECRET=<production-secret>

REDIS_HOST=<redis-host>
REDIS_PORT=<redis-port>
REDIS_PASSWORD=<redis-password>

Never commit production secrets, database credentials, Redis credentials, or API keys to Git.

🔐 Environment Variables

The following environment variables are used by the backend:

Variable	Purpose
NODE_ENV	Application environment
PORT	Backend server port
DATABASE_URL	PostgreSQL connection
JWT_SECRET	JWT signing secret
REDIS_HOST	Redis hostname
REDIS_PORT	Redis port
REDIS_PASSWORD	Redis authentication
GEMINI_API_KEY	Google Gemini API access
🎯 Demo Flow

The application can be demonstrated using the following workflow:

1. Register / Login
        ↓
2. Create Project
        ↓
3. Add API Endpoint
        ↓
4. Run Health Check
        ↓
5. Store Monitoring Data
        ↓
6. Detect API Failure
        ↓
7. Generate Incident + Alert
        ↓
8. Run Security Scan
        ↓
9. Detect Vulnerabilities
        ↓
10. Generate AI Explanation
        ↓
11. Review Analytics & Reports
💡 Key Highlights
Full-stack SaaS architecture
REST API architecture
JWT authentication
PostgreSQL + Prisma data layer
Redis-backed asynchronous processing
BullMQ job queues
Background monitoring workers
Security scanning workers
Automated incident detection
Automated recovery detection
Security scoring engine
AI-powered vulnerability analysis
AI-generated remediation recommendations
Historical monitoring analytics
Security analytics
Reporting dashboard
Production deployment using Vercel + Render
📚 Lessons Learned

Building API Guardian provided practical experience with:

Full-stack application architecture
REST API design
Authentication and authorization
PostgreSQL database design
Prisma ORM
Redis
BullMQ
Asynchronous job processing
Background workers
API observability
Incident management
Security auditing
Security scoring
AI API integration
Frontend state management
Dashboard development
Production deployment
Environment configuration
Debugging distributed application components
🔮 Future Improvements

Potential future improvements include:

Email and Slack notifications
More advanced API security tests
Request body validation
Authentication/security testing
SSL certificate monitoring
Rate-limit detection
Scheduled security scans
More granular monitoring intervals
Worker scaling
Retry and dead-letter queue management
More detailed incident analytics
Team collaboration
Role-based access control
Public status pages
API performance benchmarking
👨‍💻 Author
Akash Pandey

API Guardian is a flagship portfolio project demonstrating practical experience in:

Full-stack software engineering
Backend architecture
API observability
Asynchronous systems
Security engineering
AI integration
Production deployment
⭐ Support

If you find API Guardian interesting, consider giving the repository a ⭐ on GitHub!