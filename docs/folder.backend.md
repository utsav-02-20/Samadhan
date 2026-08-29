# SAMADHAN-SETU Backend Documentation

Production-ready backend for **Smart India Hackathon 2026** built with **Node.js, Express, TypeScript, MongoDB, Clerk Authentication, Cloudinary, Redis, and Docker**.

The architecture is modular so new entities like **University**, **Government**, and **Department** can be added without rewriting shared code.

---

# Tech Stack

| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| Node.js            | Runtime                          |
| Express.js         | REST API                         |
| TypeScript         | Type Safety                      |
| MongoDB + Mongoose | Database                         |
| Clerk              | Authentication & User Management |
| Cloudinary         | Image Storage                    |
| Redis              | Caching / Rate Limiting          |
| Docker             | Deployment                       |
| Multer             | Image Upload Middleware          |

---

# Project Structure

```text
backend/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

---

# Folder Responsibilities

## config/

Global configuration files.

| File          | Responsibility           |
| ------------- | ------------------------ |
| db.ts         | MongoDB connection       |
| env.ts        | Environment validation   |
| clerk.ts      | Clerk SDK configuration  |
| cloudinary.ts | Cloudinary configuration |
| redis.ts      | Redis connection         |

---

## middleware/

Reusable Express middleware.

| File                      | Responsibility       |
| ------------------------- | -------------------- |
| auth.middleware.ts        | Verify Clerk JWT     |
| upload.middleware.ts      | Multer image upload  |
| validate.middleware.ts    | Zod/Joi validation   |
| error.middleware.ts       | Global error handler |
| rateLimiter.middleware.ts | API rate limiting    |

---

## modules/

Every business entity is isolated into its own module.

Current module:

* Citizen

Future modules:

* University
* Government
* Department

Each module contains the same structure.

```text
modules/
└── citizen/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    ├── validators/
    └── index.ts
```

---

### controllers/

Receives HTTP request and sends response.

Example:

* Create Problem
* Update Profile
* Bookmark Problem

Controllers should contain **no business logic**.

---

### models/

MongoDB schemas.

Example models:

* Citizen
* Problem
* Bookmark
* Notification

---

### routes/

Express routes.

Example:

```ts
router.post("/", createProblem);
router.get("/:id", getProblem);
router.patch("/:id", updateProblem);
```

---

### services/

Business logic lives here.

Examples:

* Create Problem
* Upload Image
* Reverse Geocoding
* Notifications

Controllers call services.

---

### validators/

Request validation.

Examples:

* CreateProblemSchema
* UpdateCitizenSchema

---

### index.ts

Exports module routes.

```ts
router.use("/problems", problemRoutes);
router.use("/citizen", citizenRoutes);
```

---

## routes/

Combines every module into one API.

```ts
router.use("/citizen", citizenRoutes);
router.use("/university", universityRoutes);
router.use("/government", governmentRoutes);
```

---

## services/

Shared reusable services.

| File                    | Purpose              |
| ----------------------- | -------------------- |
| cloudinary.service.ts   | Upload/Delete Images |
| notification.service.ts | Notifications        |
| location.service.ts     | Location helper      |
| email.service.ts        | Email utility        |

Shared across every module.

---

## utils/

Common helper utilities.

| File            | Purpose                   |
| --------------- | ------------------------- |
| ApiResponse.ts  | Standard success response |
| ApiError.ts     | Standard error response   |
| asyncHandler.ts | Async wrapper             |
| logger.ts       | Winston/Pino logger       |
| constants.ts    | Global constants          |

---

## types/

TypeScript global types.

Currently:

* Express Request extension.
* User type.

---

# API Versioning

```text
/api/v1/citizen
/api/v1/problems
/api/v1/bookmarks
/api/v1/notifications
```

Future:

```text
/api/v1/university
/api/v1/government
/api/v1/department
```

---

# Authentication Flow

1. User signs in using Clerk.
2. Frontend gets Clerk JWT.
3. JWT sent as Bearer Token.
4. auth.middleware.ts verifies token.
5. User information attached to req.user.

---

# Request Flow

```text
Client
   │
   ▼
Route
   │
Middleware
   │
Controller
   │
Service
   │
Model
   │
MongoDB
```

---

# Environment Variables

Create `.env`

```env
PORT=5000

MONGODB_URI=

CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

REDIS_URL=
```

`.env.example` contains keys only.

---

# Available Scripts

```bash
npm install
npm run dev
npm run build
npm start
```

---

# Adding a New Entity

To add **University** later:

```text
modules/
└── university/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    ├── validators/
    └── index.ts
```

No changes are required in middleware, utils, services, auth, or config.

Just register the module in `routes/index.ts`.

---

# Deployment

* Docker Container
* MongoDB Atlas
* Cloudinary
* Clerk
* Redis
* Render / Railway / VPS

The same backend serves both **Next.js Web** and **React Native Mobile** applications.

---

# Best Practices

* Keep controllers thin.
* Keep business logic inside services.
* Validate every request.
* Never access database directly from controllers.
* Use shared utilities for responses and errors.
* One module = one business entity.
* API versioning (`/api/v1`) from day one.
