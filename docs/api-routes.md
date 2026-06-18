# API Guardian API Routes

## Base URL

/api/v1

---

# Authentication

## Register User

POST /auth/register

Purpose:
Create a new user account.

Request Body:

{
  "name": "Akash",
  "email": "akash@example.com",
  "password": "password123"
}

Response:

{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Akash",
    "email": "akash@example.com"
  }
}

---

## Login User

POST /auth/login

Purpose:
Authenticate user and return JWT.

Request Body:

{
  "email": "akash@example.com",
  "password": "password123"
}

Response:

{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Akash",
    "email": "akash@example.com"
  }
}

---

## Get Current User

GET /auth/me

Purpose:
Return logged-in user profile.

Response:

{
  "id": "uuid",
  "name": "Akash",
  "email": "akash@example.com"
}

---
# Dashboard

## Get Dashboard Overview

GET /dashboard

Purpose:
Return dashboard summary data for the logged-in user.

Response:

{
  "totalProjects": 5,
  "totalEndpoints": 18,
  "activeIncidents": 2,
  "averageUptime": 99.8,
  "securityScore": 84
}

---

# Projects

## Create Project

POST /projects

Purpose:
Create a new project.

Request Body:

{
  "name": "Production APIs",
  "description": "Production environment"
}

Response:

{
  "id": "uuid",
  "name": "Production APIs",
  "description": "Production environment"
}

---

## Get All Projects

GET /projects

Purpose:
Return all projects owned by the logged-in user.

Response:

{
  "projects": []
}

---

## Get Single Project

GET /projects/:projectId

Purpose:
Return project details.

Response:

{
  "id": "uuid",
  "name": "Production APIs",
  "description": "Production environment"
}

---

## Update Project

PATCH /projects/:projectId

Purpose:
Update project details.

Request Body:

{
  "name": "Production APIs",
  "description": "Updated description"
}

Response:

{
  "id": "uuid",
  "name": "Production APIs",
  "description": "Updated description"
}

---

## Delete Project

DELETE /projects/:projectId

Purpose:
Delete project.

Response:

{
  "message": "Project deleted successfully"
}

---

# Endpoints

## Create Endpoint

POST /projects/:projectId/endpoints

Purpose:
Add API endpoint to a project.

Request Body:

{
  "name": "Users API",
  "url": "https://api.example.com/users",
  "method": "GET",
  "headers": {},
  "requestBody": {},
  "authConfig": {},
  "monitoringInterval": 60
}

Response:

{
  "id": "uuid",
  "name": "Users API",
  "url": "https://api.example.com/users",
  "method": "GET",
  "monitoringInterval": 60,
  "isActive": true,
  "lastStatus": "UNKNOWN"
}

---

## Get Project Endpoints

GET /projects/:projectId/endpoints

Purpose:
List all endpoints in a project.

Response:

{
  "endpoints": []
}

---

## Get Endpoint Details

GET /endpoints/:endpointId

Purpose:
Return endpoint details.

Response:

{
  "id": "uuid",
  "name": "Users API",
  "url": "https://api.example.com/users",
  "method": "GET",
  "headers": {},
  "requestBody": {},
  "authConfig": {},
  "monitoringInterval": 60,
  "isActive": true,
  "lastStatus": "UNKNOWN"
}

---

## Get Endpoint Status

GET /endpoints/:endpointId/status

Purpose:
Return current endpoint health status.

Response:

{
  "status": "UP",
  "statusCode": 200,
  "latency": 120,
  "lastCheckedAt": "2026-06-14T10:00:00.000Z"
}

---

## Update Endpoint

PATCH /endpoints/:endpointId

Purpose:
Update endpoint.

Request Body:

{
  "name": "Users API",
  "url": "https://api.example.com/users",
  "method": "GET",
  "headers": {},
  "requestBody": {},
  "authConfig": {},
  "monitoringInterval": 60,
  "isActive": true
}

Response:

{
  "id": "uuid",
  "name": "Users API",
  "url": "https://api.example.com/users",
  "method": "GET",
  "isActive": true
}

---

## Delete Endpoint

DELETE /endpoints/:endpointId

Purpose:
Delete endpoint.

Response:

{
  "message": "Endpoint deleted successfully"
}

---

# Monitoring

## Get Endpoint Monitoring Logs

GET /endpoints/:endpointId/logs

Purpose:
Return monitoring history.

Query Params:

?limit=100

Response:

{
  "logs": []
}

---

## Get Endpoint Analytics

GET /endpoints/:endpointId/analytics

Purpose:
Return endpoint monitoring analytics.

Response:

{
  "uptimePercentage": 99.5,
  "averageLatency": 120,
  "successRate": 99.5,
  "statusCodeDistribution": {
    "200": 95,
    "500": 2,
    "timeout": 1
  }
}

---

## Trigger Manual Health Check

POST /endpoints/:endpointId/check

Purpose:
Run monitoring immediately.

Response:

{
  "message": "Health check completed",
  "result": {
    "statusCode": 200,
    "latency": 120,
    "responseSize": 1024,
    "isUp": true,
    "checkedAt": "2026-06-14T10:00:00.000Z"
  }
}

---

# Incidents

## Get All Incidents

GET /incidents

Purpose:
Return incident history for the logged-in user.

Response:

{
  "incidents": []
}

---

## Get Endpoint Incidents

GET /endpoints/:endpointId/incidents

Purpose:
Return incidents for a specific endpoint.

Response:

{
  "incidents": []
}

---

## Get Incident Details

GET /incidents/:incidentId

Purpose:
Return single incident details.

Response:

{
  "id": "uuid",
  "endpointId": "uuid",
  "startedAt": "2026-06-14T10:00:00.000Z",
  "endedAt": null,
  "duration": null,
  "status": "OPEN",
  "failureCount": 1,
  "lastErrorMessage": "Request timeout"
}

---

# Security Scans

## Run Security Scan

POST /endpoints/:endpointId/security-scan

Purpose:
Start a manual security scan.

Response:

{
  "message": "Security scan completed",
  "scanId": "uuid",
  "score": 75
}

---

## Get Latest Security Scan

GET /endpoints/:endpointId/security-scan

Purpose:
Return latest scan result.

Response:

{
  "id": "uuid",
  "endpointId": "uuid",
  "score": 75,
  "scanDuration": 800,
  "scannedAt": "2026-06-14T10:00:00.000Z"
}

---

## Get Security Scan History

GET /endpoints/:endpointId/security-scans

Purpose:
Return previous scans.

Response:

{
  "securityScans": []
}

---

## Get Security Scan Details

GET /security-scans/:scanId

Purpose:
Return complete security scan details.

Response:

{
  "id": "uuid",
  "endpointId": "uuid",
  "score": 75,
  "scanDuration": 800,
  "scannedAt": "2026-06-14T10:00:00.000Z"
}

---

## Get Security Issues

GET /security-scans/:scanId/issues

Purpose:
Return vulnerabilities found in a scan.

Response:

{
  "issues": []
}

---

# AI Analysis

## Generate AI Explanation

POST /security-issues/:issueId/explain

Purpose:
Generate AI explanation and remediation for one security issue.

Response:

{
  "severity": "HIGH",
  "explanation": "This issue can expose the API to security risks.",
  "suggestedFix": "Add the recommended security header."
}

---

# Alerts

## Get Alerts

GET /alerts

Purpose:
Return all alerts for the logged-in user.

Response:

{
  "alerts": []
}

---

## Mark Alert As Read

PATCH /alerts/:alertId/read

Purpose:
Mark alert as read.

Response:

{
  "message": "Alert marked as read"
}

---

# Reports

## Generate Monitoring Report

POST /reports/monitoring

Purpose:
Generate monitoring PDF report.

Request Body:

{
  "endpointId": "uuid",
  "range": "7d"
}

Response:

{
  "message": "Monitoring report generated",
  "reportId": "uuid"
}

---

## Generate Security Report

POST /reports/security

Purpose:
Generate security PDF report.

Request Body:

{
  "endpointId": "uuid",
  "scanId": "uuid"
}

Response:

{
  "message": "Security report generated",
  "reportId": "uuid"
}

---

## Download Report

GET /reports/:reportId/download

Purpose:
Download generated PDF.

Response:

PDF file download        
