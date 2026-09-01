# Samadhan Backend - Citizen Module Documentation

> Phase 2: Citizen Backend Module (Days 3–4)

This document explains the purpose and functionality of every file used in the Citizen backend module.

---

# Folder Structure

```text
src/modules/citizens
├── controllers
│   └── citizen.controller.ts
├── models
│   ├── citizen.model.ts
│   └── problem.model.ts
├── routes
│   └── citizen.routes.ts
├── services
│   └── citizen.service.ts
├── validators
│   └── citizen.validator.ts
└── .gitkeep
```

---

# 1. citizen.model.ts

**Location**

```text
src/modules/citizens/models/citizen.model.ts
```

## Purpose

Defines the MongoDB schema for a **Citizen** using Mongoose.

## Functionality

- Stores authenticated citizen details from Clerk.
- Maps Clerk User ID to MongoDB.
- Stores citizen profile information.
- Creates the `citizens` collection.

## Stores

- Clerk ID
- Name
- Email
- Phone Number
- District
- Created Timestamp

## Used By

- `citizen.service.ts`
- `problem.model.ts`

---

# 2. problem.model.ts

**Location**

```text
src/modules/citizens/models/problem.model.ts
```

## Purpose

Defines the MongoDB schema for problems reported by citizens.

## Functionality

- Stores complaint information.
- Saves uploaded Cloudinary image URLs.
- Stores live location coordinates.
- Tracks complaint workflow status.
- Maintains community upvotes.

## Stores

- Citizen Reference ID
- Title
- Description
- Category
- District
- Latitude & Longitude
- Image URLs
- Status
- Upvote Count
- Users Who Upvoted

## Used By

- `citizen.service.ts`
- `citizen.controller.ts`

---

# 3. citizen.validator.ts

**Location**

```text
src/modules/citizens/validators/citizen.validator.ts
```

## Purpose

Contains Zod schemas for validating API requests.

## Functionality

Validates:

- Citizen Registration
- Create Problem Request
- District Query
- Category Query
- Upvote Request

## Responsibilities

- Reject invalid requests.
- Validate required fields.
- Ensure valid district/category values.
- Return structured validation errors.

## Used By

- `citizen.routes.ts`

---

# 4. citizen.service.ts

**Location**

```text
src/modules/citizens/services/citizen.service.ts
```

## Purpose

Contains the business logic for the Citizen module.

## Functionality

### Citizen Services

- Register Citizen
- Find Citizen by Clerk ID

### Problem Services

- Create new problem.
- Upload images to Cloudinary.
- Save complaint in MongoDB.
- Fetch citizen's own complaints.
- Fetch public complaint feed.
- Filter complaints by district/category.
- Toggle community upvotes.

## Responsibilities

- Database operations.
- Cloudinary integration.
- Business rules.
- Workflow status updates.
- Upvote logic.

## Called By

- `citizen.controller.ts`

---

# 5. citizen.controller.ts

**Location**

```text
src/modules/citizens/controllers/citizen.controller.ts
```

## Purpose

Handles incoming HTTP requests and outgoing responses.

## Functionality

Controllers:

- Register Citizen
- Submit Problem
- Get My Problems
- Get Public Feed
- Upvote Problem

## Responsibilities

- Receive request.
- Call service layer.
- Return JSON response.
- Handle success/error responses.

## Used By

- `citizen.routes.ts`

---

# 6. citizen.routes.ts

**Location**

```text
src/modules/citizens/routes/citizen.routes.ts
```

## Purpose

Defines Express API routes for the Citizen module.

## Functionality

Maps API endpoints to controllers.

### Routes

| Method | Endpoint |
|--------|----------|
| POST | `/register` |
| POST | `/problem` |
| GET | `/problem/my` |
| GET | `/feed` |
| PATCH | `/problem/:id/upvote` |

## Responsibilities

- Route registration.
- Attach validation middleware.
- Attach authentication middleware.

## Mounted At

```text
/api/v1/citizens
```

---

# 7. src/routes/index.ts

**Location**

```text
src/routes/index.ts
```

## Purpose

Central router for the entire backend.

## Functionality

Combines all module routes:

- Citizens
- Government
- Department
- University

## Responsibilities

- API versioning.
- Route grouping.
- Export root router.

## Mount Example

```text
/api/v1/citizens
/api/v1/government
/api/v1/department
```

---

# 8. cloudinary.ts

**Location**

```text
src/config/cloudinary.ts
```

## Purpose

Configures Cloudinary SDK.

## Functionality

- Connects Cloudinary using environment variables.
- Uploads complaint images.
- Deletes images if required.

## Used By

- `citizen.service.ts`

---

# 9. validate.middleware.ts

**Location**

```text
src/middleware/validate.middleware.ts
```

## Purpose

Generic middleware for Zod validation.

## Functionality

- Validates request body.
- Validates query parameters.
- Stops invalid requests before controllers.

## Responsibilities

- Input validation.
- Error formatting.

---

# 10. auth.middleware.ts

**Location**

```text
src/middleware/auth.middleware.ts
```

## Purpose

Protects authenticated Citizen APIs.

## Functionality

- Verifies Clerk JWT/session.
- Extracts authenticated citizen.
- Adds user information to `req.user`.

## Responsibilities

- Authentication.
- Authorization.

---

# 11. app.ts

**Location**

```text
src/app.ts
```

## Purpose

Creates and configures the Express application.

## Functionality

Registers:

- CORS
- JSON Parser
- API Routes
- Error Handler
- Health Check Route

## Responsibilities

- Express configuration.
- Middleware registration.
- Route mounting.

---

# 12. server.ts

**Location**

```text
src/server.ts
```

## Purpose

Backend application entry point.

## Functionality

- Loads environment variables.
- Connects MongoDB.
- Starts Express server.

## Responsibilities

- Database connection.
- Server startup.
- Listen on configured port.

---

# Complete Request Flow

```text
Frontend (Citizen Dashboard)
          │
          ▼
Citizen API Request
          │
          ▼
citizen.routes.ts
          │
          ▼
Validation Middleware (Zod)
          │
          ▼
Authentication Middleware (Clerk)
          │
          ▼
citizen.controller.ts
          │
          ▼
citizen.service.ts
          │
     ┌────┴────┐
     ▼         ▼
Problem Model  Citizen Model
     │         │
     └────┬────┘
          ▼
      MongoDB Atlas
          │
          ▼
 Cloudinary Image Storage
          │
          ▼
 JSON Response to Frontend
```

---

# Summary

| File | Responsibility |
|------|----------------|
| `citizen.model.ts` | Citizen MongoDB schema. |
| `problem.model.ts` | Problem MongoDB schema with status, images, location, and upvotes. |
| `citizen.validator.ts` | Zod request validation schemas. |
| `citizen.service.ts` | Business logic, MongoDB queries, Cloudinary uploads, feed, and upvotes. |
| `citizen.controller.ts` | Handles HTTP requests and responses. |
| `citizen.routes.ts` | Registers Citizen API endpoints and middleware. |
| `src/routes/index.ts` | Mounts all backend module routes under `/api/v1`. |
| `cloudinary.ts` | Cloudinary SDK configuration. |
| `validate.middleware.ts` | Generic request validation middleware. |
| `auth.middleware.ts` | Clerk authentication middleware. |
| `app.ts` | Express app configuration. |
| `server.ts` | Starts backend server and connects MongoDB. |