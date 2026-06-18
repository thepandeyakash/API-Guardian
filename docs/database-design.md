# API Guardian Database Design

## User

Stores account information.

Fields:

* id (UUID)
* name (String)
* email (String, Unique)
* passwordHash (String)
* createdAt (DateTime)
* updatedAt (DateTime)

Relationship:

* One User can have many Projects

---

## Project

Groups related API endpoints.

Example:

* Production APIs
* Staging APIs
* Personal Project APIs

Fields:

* id (UUID)
* userId (Foreign Key)
* name (String)
* description (String, Optional)
* createdAt (DateTime)
* updatedAt (DateTime)

Relationship:

* Belongs to one User
* Has many Endpoints

---

## Endpoint

Stores monitored APIs.

Example:

* GET https://api.example.com/users
* POST https://api.example.com/login

Fields:

* id (UUID)
* projectId (Foreign Key)
* name (String)
* url (String)
* method (HttpMethod Enum)
* headers (JSON, Optional)
* requestBody (JSON, Optional)
* authConfig (JSON, Optional)
* monitoringInterval (Integer)
* isActive (Boolean)
* lastStatus (UP/DOWN/UNKNOWN)
* lastStatusCode (Integer, Optional)
* lastLatency (Integer, Optional)
* lastCheckedAt (DateTime, Optional)
* createdAt (DateTime)
* updatedAt (DateTime)

Relationship:

* Belongs to one Project
* Has many MonitoringLogs
* Has many Incidents
* Has many SecurityScans
* Has many Alerts

---

## MonitoringLog

Stores every monitoring result.

Fields:

* id (UUID)
* endpointId (Foreign Key)
* statusCode (Integer, Optional)
* latency (Integer, Optional)
* responseSize (Integer, Optional)
* isUp (Boolean)
* errorMessage (String, Optional)
* checkedAt (DateTime)

Relationship:

* Belongs to one Endpoint

---

## Incident

Created when an API goes down.

Fields:

* id (UUID)
* endpointId (Foreign Key)
* startedAt (DateTime)
* endedAt (DateTime, Optional)
* duration (Integer, Optional)
* status (IncidentStatus Enum)
* failureCount (Integer)
* lastErrorMessage (String, Optional)
* createdAt (DateTime)
* updatedAt (DateTime)

Relationship:

* Belongs to one Endpoint
* Can have many Alerts

---

## SecurityScan

Stores security scan results.

Fields:

* id (UUID)
* endpointId (Foreign Key)
* score (Integer)
* scanDuration (Integer)
* scannedAt (DateTime)
* createdAt (DateTime)

Relationship:

* Belongs to one Endpoint
* Has many SecurityIssues
* Can have many Alerts

---

## SecurityIssue

Stores vulnerabilities found during a security scan.

Examples:

* Missing HSTS
* Open CORS
* Missing CSP
* Missing X-Frame-Options
* Missing X-Content-Type-Options

Fields:

* id (UUID)
* securityScanId (Foreign Key)
* title (String)
* severity (Severity Enum)
* description (String)
* recommendation (String)
* aiExplanation (String, Optional)
* aiSuggestedFix (String, Optional)
* createdAt (DateTime)

Relationship:

* Belongs to one SecurityScan

---

## Alert

Stores notifications shown or sent to users.

Fields:

* id (UUID)
* endpointId (Foreign Key)
* incidentId (Foreign Key, Optional)
* securityScanId (Foreign Key, Optional)
* type (AlertType Enum)
* channel (AlertChannel Enum)
* status (AlertStatus Enum)
* isRead (Boolean)
* title (String)
* message (String)
* sentAt (DateTime, Optional)
* readAt (DateTime, Optional)
* createdAt (DateTime)

Relationship:

* Belongs to one Endpoint
* Can belong to one Incident
* Can belong to one SecurityScan

---

## Enums

HttpMethod

- GET
- POST
- PUT
- PATCH
- DELETE

EndpointStatus

- UP
- DOWN
- UNKNOWN

IncidentStatus

- OPEN
- CLOSED

Severity

- LOW
- MEDIUM
- HIGH
- CRITICAL

AlertType

- DOWN
- RECOVERED
- SECURITY

AlertChannel

- EMAIL
- DASHBOARD

AlertStatus

- PENDING
- SENT
- FAILED

---

## Database Rules & Constraints

### Unique Constraints

User

* email must be unique

---

### Cascade Delete Rules

User deleted

* Delete Projects

Project deleted

* Delete Endpoints

Endpoint deleted

* Delete MonitoringLogs
* Delete Incidents
* Delete SecurityScans
* Delete SecurityIssues
* Delete Alerts

SecurityScan deleted

* Delete SecurityIssues

Optional Relations

* If Incident is deleted, related Alert.incidentId should be set to null
* If SecurityScan is deleted, related Alert.securityScanId should be set to null

---

### Query Indexes

Project

* userId

Endpoint

* projectId

MonitoringLog

* endpointId
* checkedAt
* (endpointId, checkedAt)

Incident

* endpointId
* status
* (endpointId, status)

SecurityScan

* endpointId
* (endpointId, scannedAt)

SecurityIssue

* securityScanId

Alert

* endpointId
* status
* createdAt

---

### Business Rules

* Only one OPEN Incident can exist per Endpoint at a time
* Security Score must be between 0 and 100
* Monitoring Interval must be greater than 0
* Duration values must be non-negative
* Latency values must be non-negative
* Response Size values must be non-negative
