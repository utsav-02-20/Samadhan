# Samadhan Project — Frontend + Backend Integration Task (Master Prompt)

You are my senior **Next.js + Express + Clerk + MongoDB** developer.

Your job is to connect my existing **Samadhan** frontend and backend **without redesigning the UI**. Keep the existing folder structure, components, and pages. Only replace mock data with backend APIs and create missing integration files.

## Project Stack

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Existing UI is already completed.

### Backend

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Clerk JWT Authentication Middleware
- Cloudinary for image uploads.
- API base URL:
  - `http://localhost:5000/api/v1`

### Frontend URL

- `http://localhost:3000`

---

# Backend APIs (Use These Exact Routes)

## Citizen Module

| MethodEndpointAuth |                                          |                |
| ------------------ | ---------------------------------------- | -------------- |
| POST               | `/api/v1/citizens/register`              | ✅ Bearer Token |
| POST               | `/api/v1/citizens/:citizenId/complaints` | ✅ Bearer Token |
| GET                | `/api/v1/citizens/feed`                  | ❌ Public       |
| GET                | `/api/v1/citizens/:citizenId/history`    | ✅ Bearer Token |
| PATCH              | `/api/v1/citizens/upvote`                | ✅ Bearer Token |

Use these exact request/response structures from the backend.

---

# Authentication Requirements

Use Clerk only.

- Use `useUser()` and `useAuth()`.
- Obtain JWT using `getToken()`.
- Send it in every protected request:

Authorization: Bearer

Do not create another authentication system.

---

# Integration Rules

1. Do NOT redesign any UI.
2. Do NOT remove Tailwind styling.
3. Keep existing components and folder structure.
4. Use reusable service functions.
5. Keep API logic outside page components.
6. Add loading and error handling where necessary.
7. Use TypeScript everywhere.

---

# Step-by-Step Implementation Plan

## Step 1 — Create API Layer

### Create

frontend/lib/api.ts

### Purpose

- Store `NEXT_PUBLIC_API_URL`.
- Create reusable fetch helper.
- Automatically attach Authorization header if token exists.

### Create

frontend/lib/auth.ts

### Purpose

- Helper to retrieve Clerk JWT.
- Return Authorization headers.

---

## Step 2 — Create Citizen Service

### Create

frontend/services/citizen.service.ts

### Include Functions

- registerCitizen()
- submitComplaint()
- getPublicFeed()
- getCitizenHistory()
- toggleUpvote()

Every function should use `lib/api.ts`.

---

## Step 3 — Auto Register Citizen

### Create

frontend/hooks/useCitizen.ts

### Purpose

When Clerk user becomes authenticated:

- Get token.
- Call `POST /citizens/register`.
- Send:

```json
{
  "clerkId": "...",
  "name": "...",
  "email": "...",
  "phone": "...",
  "district": ""
}

```

Use this hook inside:

frontend/app/citizen/(dashboard)/layout.tsx

Only run once.

---

## Step 4 — Connect Submit Complaint Page

### Edit

frontend/app/citizen/(dashboard)/submit/page.tsx

### Existing Features Already Present

- Title
- Description
- Category
- Image Upload
- Live GPS
- OpenStreetMap Reverse Geocoding

### Replace Submit Logic

Call

POST /citizens/\:citizenId/complaints

Send multipart/form-data including:

- title
- description
- category
- district
- latitude
- longitude
- images[]

Show success toast/message after submission.

---

## Step 5 — Connect Dashboard Feed

### Edit

frontend/app/citizen/(dashboard)/dashboard/page.tsx

### Replace

Remove mock complaint array.

### Fetch

GET /citizens/feed

### Support Filters

- district
- category

Populate existing complaint cards.

---

## Step 6 — Connect Complaint History

### Edit

frontend/app/citizen/(dashboard)/history/page.tsx

### Fetch

GET /citizens/\:citizenId/history

Display:

- complaint title
- category
- district
- submitted date
- workflow status
- images
- department updates

Reuse existing card UI.

---

## Step 7 — Connect Upvote

### Edit

ComplaintCard component.

### Call

PATCH /citizens/upvote

Body

```json
{
  "problemId": "..."
}

```

Update upvote count immediately after success.

---

# Environment Variables

Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...

```

Backend `.env`

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=...
CLERK_SECRET_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

```

---

# Folder Structure to Create

```text
frontend/
├── lib/
│   ├── api.ts
│   └── auth.ts
├── hooks/
│   └── useCitizen.ts
├── services/
│   └── citizen.service.ts

```

Only create these if they don't already exist.

---

# Expected Output Format

For each step:

### Step X — File Name

**Purpose**

Explain what the file does.

**File Comment**

Provide a production-style comment for the top of the file.

**Complete Code**

Give the entire file, not partial snippets.

**What Changed**

Explain exactly what was added or modified.

**Testing**

Provide the API endpoint, request body, and expected response so I can test using Thunder Client/Postman.

---

# Final Deliverables

By the end, I should have:

- ✅ Clerk authentication connected to backend JWT.
- ✅ Citizen auto-registration after login.
- ✅ Complaint submission connected to MongoDB + Cloudinary.
- ✅ Public complaint feed using backend.
- ✅ Citizen complaint history using backend.
- ✅ Community upvote functionality connected.
- ✅ No mock data remaining in the Citizen module.
- ✅ Project runs with frontend on port **3000** and backend on port **5000**.

name all file and comments what they shuld have so its easy to read them 