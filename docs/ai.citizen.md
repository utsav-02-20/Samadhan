# SAMADHAN-SETU: SIH26043 — Project Strategy & Citizen Portal Roadmap

> **Problem Statement:** SIH26043 — A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships  
> **Organization:** Government of Jharkhand | Department of Higher & Technical Education  
> **Theme:** Disaster Management & Societal Innovation  
> **Target Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Node.js/Express, MongoDB (Mongoose), Cloudinary, Clerk/JWT  

---

## 1. Core Problem Summary

In Jharkhand, local communities encounter real-life challenges daily — ranging from water scarcity, agricultural distress, rural healthcare access, seasonal flash floods/droughts, waste management, to basic infrastructure bottlenecks. 

Currently:
1. **Citizens have no structured platform** to submit issues with ground evidence (photos, GPS coordinates, descriptions) and track their resolution.
2. **Higher Education Institutions (HEIs)** have thousands of engineering, science, and management students and faculty researchers looking for meaningful final-year projects and research problems, but they are isolated from real local problems.
3. **Industries & Startups** have CSR funds and technical mentoring capability but lack a direct bridge to connect with student-driven solutions.
4. **Government Departments** lack real-time data and transparency on grassroots challenges across Jharkhand's districts and the innovation pipelines solving them.

**Samadhan-Setu** bridges this gap: transforming crowdsourced grassroots problems into university research projects, supported by industry mentors and monitored by government departments.

---

## 2. Key Functional Requirements

| Module | Core Functionality |
|---|---|
| **1. Citizen Engagement** | • Easy submission of societal challenges with photo/multimedia evidence, GPS location, district/block, and domain tags.<br>• Real-time problem status tracking (Submitted &rarr; Validated &rarr; Assigned to University &rarr; Prototyping &rarr; Solved).<br>• Community upvoting and commenting to prioritize urgent community needs. |
| **2. AI Categorization & Routing** | • Auto-categorize problems into domains (Water, Agriculture, Disaster, Health, Infrastructure, etc.).<br>• Detect duplicate/similar grievances in the same area.<br>• Recommend/route challenges to appropriate universities based on department expertise (e.g. BIT Mesra, IIT ISM Dhanbad, etc.). |
| **3. University Collaboration** | • University faculty & student teams browse validated district problems.<br>• Submit solution proposals, form multidisciplinary student teams, assign faculty guides.<br>• Milestone and project progress tracking. |
| **4. Industry & CSR Partnership** | • Industry partners browse promising college projects to provide funding, CSR grants, technical mentorship, or pilot testing. |
| **5. Government Analytics Dashboard** | • Heatmaps of district problems across Jharkhand.<br>• Resolution rate, university participation rankings, and impact metrics. |

---

## 3. Concrete Solution Architecture (College-Friendly & Simple)

To keep development manageable and avoid overwhelming college-level developers, we adopt a **clean, modular, lightweight Monorepo/Multi-folder architecture**:

```
Samadhan/
├── backend/          # Node.js + Express + TypeScript + MongoDB REST API
├── frontend/         # Next.js 16 (App Router) + TypeScript + Tailwind CSS
└── docs/             # Project documentation & roadmaps
```

### Architecture Diagram

```
[ Citizen / Mobile / Web ]
           │ (HTTPS / REST)
           ▼
   [ Next.js Frontend ] 
     - Citizen Portal (/citizen)
     - University Portal (/university)
     - Govt Dashboard (/government)
           │
           ▼
   [ Express Backend API (src/) ]
     ├── Common Config & Middleware (DB, Auth, Upload, Error)
     ├── AI Helper (Auto-category & Priority)
     └── Domain Modules:
           ├── /citizens     (Citizen profile & problem submissions)
           ├── /university   (Problem adoption & project proposals)
           └── /government   (Review, analytics & district tracking)
           │
           ▼
    [ MongoDB Database ] + [ Cloudinary (Images) ]
```

---

## 4. Prototype Scope (SIH Hackathon Phase)

For a winning hackathon prototype, we will execute in clear, focused phases. Our immediate focus is:
1. **Common Backend Infrastructure** (reusable helpers, DB connection, error handlers, upload helpers).
2. **Citizen Portal (End-to-End)**:
   - Citizen authentication & profile setup.
   - Challenge reporting form with image upload & GPS auto-detection.
   - Citizen Dashboard (Track submitted issues, status timeline, upvotes).
   - Public Challenge Feed (Explore local issues by Jharkhand district).

---

## 5. Backend Folder & File Blueprint (Comments-First Structure)

Below is the exact modular layout for the backend. Each folder mirrors the citizen module pattern so any teammate can work on their respective module without merge conflicts.

### A. Common Backend Core

```text
backend/src/
├── config/
│   ├── db.ts               # Connect to MongoDB using Mongoose with retry logic
│   ├── env.ts              # Load and validate environment variables (PORT, MONGO_URI, etc.)
│   ├── clerk.ts            # Setup Clerk authentication client SDK
│   └── cloudinary.ts       # Configure Cloudinary for media uploads
│
├── middleware/
│   ├── auth.middleware.ts        # Extract JWT token from header and attach user to req.user
│   ├── upload.middleware.ts      # Multer middleware to handle multipart image uploads in-memory
│   ├── validate.middleware.ts    # Generic Zod schema validation middleware for req.body
│   ├── error.middleware.ts       # Centralized global error handling middleware (returns standard JSON)
│   └── rateLimiter.middleware.ts # Basic rate limiter to prevent API abuse
│
├── utils/
│   ├── ApiResponse.ts      # Standard success response class: { success: true, statusCode, message, data }
│   ├── ApiError.ts         # Custom error class: { success: false, statusCode, message, errors }
│   ├── asyncHandler.ts     # Wrapper function to eliminate repetitive try/catch blocks in controllers
│   ├── constants.ts        # Enums: ProblemCategory, ProblemStatus, UserRoles, JharkhandDistricts
│   └── logger.ts           # Clean console logger for request methods and error logs
│
├── services/               # Shared cross-module services
│   ├── cloudinary.service.ts   # Function: uploadBufferToCloudinary(fileBuffer, folder) -> secure_url
│   ├── ai.service.ts           # Function: classifyProblem(title, description) -> category & tags
│   ├── location.service.ts     # Function: getDistrictFromCoordinates(lat, lng) -> district name
│   └── notification.service.ts # Function: sendStatusNotification(userId, message, problemId)
│
└── routes/
    └── index.ts            # Mount all modules: /api/v1/citizens, /api/v1/university, etc.
```

---

### B. Citizen Module (`backend/src/modules/citizens/`)

```text
backend/src/modules/citizens/
├── models/
│   ├── citizen.model.ts        # Mongoose schema: Citizen profile (name, phone, district, aadharLast4, clerkId)
│   └── problem.model.ts        # Mongoose schema: Societal Challenge (title, description, category, district, coordinates, images, status, upvotes, submittedBy, assignedUniversity)
│
├── validators/
│   └── citizen.validator.ts    # Zod schemas: createProblemSchema, updateProfileSchema, upvoteProblemSchema
│
├── services/
│   └── citizen.service.ts      # Business logic: createProblem(), getMyProblems(), getProblemById(), getAllPublicProblems(), toggleUpvote()
│
├── controllers/
│   └── citizen.controller.ts   # HTTP handlers: calls citizen.service methods and returns ApiResponse
│
├── routes/
│   └── citizen.routes.ts       # Express router: POST /, GET /my-problems, GET /feed, GET /:id, POST /:id/upvote
│
└── index.ts                    # Module export: exports citizen.routes.ts to be mounted in src/routes/index.ts
```

---

### C. University & Government Modules (Matching Structure for Consistency)

```text
backend/src/modules/university/
├── models/university.model.ts      # University/College schema (name, AISHE code, district, departments)
├── models/proposal.model.ts        # Student/Faculty solution proposal for an adopted problem
├── validators/university.validator.ts # Zod schemas for solution submission & team registration
├── services/university.service.ts  # Logic: browseAvailableProblems(), adoptProblem(), submitSolution()
├── controllers/university.controller.ts # HTTP handlers for university operations
├── routes/university.routes.ts     # Routes: /api/v1/university/...
└── index.ts

backend/src/modules/goverment/
├── models/department.model.ts      # Govt Department schema (Higher Ed, Water, Agriculture, Disaster Mgmt)
├── validators/goverment.validator.ts # Zod schemas for status approval & review
├── services/goverment.service.ts   # Logic: getDistrictAnalytics(), verifyProblem(), reassignProblem()
├── controllers/goverment.controller.ts # HTTP handlers for admin/govt operations
├── routes/goverment.routes.ts      # Routes: /api/v1/government/...
└── index.ts
```

---

## 6. Step-by-Step Roadmap to Complete Citizen Portal

### Phase 1: Common Backend Foundation (Days 1–2)
- [ ] **Step 1.1**: Initialize `src/config/db.ts` with Mongoose connection logic.
- [ ] **Step 1.2**: Implement standard utilities in `src/utils/` (`ApiResponse.ts`, `ApiError.ts`, `asyncHandler.ts`, `constants.ts`).
- [ ] **Step 1.3**: Configure Cloudinary in `src/config/cloudinary.ts` and `src/services/cloudinary.service.ts` for handling photo evidence.
- [ ] **Step 1.4**: Setup global error middleware (`src/middleware/error.middleware.ts`) and validation middleware.

### Phase 2: Citizen Backend Module Implementation (Days 3–4)
- [ ] **Step 2.1**: Define Mongoose schemas for `Problem` and `Citizen` in `src/modules/citizens/models/`.
- [ ] **Step 2.2**: Write Zod request validation schemas in `src/modules/citizens/validators/citizen.validator.ts`.
- [ ] **Step 2.3**: Build core business functions in `src/modules/citizens/services/citizen.service.ts`:
  - Create problem with Cloudinary photo uploads.
  - Fetch citizen's submitted problems with current workflow status.
  - Public problem feed filtered by Jharkhand districts (e.g. Ranchi, Dhanbad, Jamshedpur, Bokaro, etc.).
  - Upvoting / community endorsement system.
- [ ] **Step 2.4**: Connect Express controllers and register routes in `src/modules/citizens/routes/citizen.routes.ts`.
- [ ] **Step 2.5**: Mount routes into `src/routes/index.ts` under `/api/v1/citizens`.

### Phase 3: Citizen Frontend Pages in Next.js (Days 5–6)
- [ ] **Step 3.1**: Setup API client helper in `frontend/services/api.ts` to call backend endpoints.
- [ ] **Step 3.2**: Build **Citizen Dashboard** (`/citizen/dashboard`):
  - Metric stat cards: *Total Problems Reported*, *Under University Review*, *In-Progress Solutions*, *Resolved Issues*.
  - List of user's active problems with live status progress bar.
- [ ] **Step 3.3**: Build **Problem Submission Form** (`/citizen/grievances/new` or `/citizen/report`):
  - Problem title, detailed description, domain category dropdown (Disaster Management, Water, Agriculture, Healthcare, etc.).
  - District & Block selector (Jharkhand 24 districts).
  - Geolocation button (captures current GPS latitude & longitude).
  - Photo evidence uploader with drag-and-drop preview.
- [ ] **Step 3.4**: Build **Community Feed & Problem Detail View** (`/citizen/grievances` & `/citizen/grievances/[id]`):
  - Card view of societal challenges with district tags and upvote counters.
  - Detail page showing photo evidence, assigned university details, and solution milestones.

### Phase 4: Integration & Prototype Polish (Day 7)
- [ ] **Step 4.1**: Test end-to-end flow: Citizen submits problem &rarr; Image stored on Cloudinary &rarr; Saved in MongoDB &rarr; Visible on dashboard & public feed.
- [ ] **Step 4.2**: Add AI Auto-Categorization (suggests category based on problem description using lightweight prompt).
- [ ] **Step 4.3**: Add responsive mobile styling so citizens can easily file issues on smartphones.

---

## 7. Next Action
Once approved, we will proceed step-by-step according to this roadmap when instructed: **"ok give me code for it"**.
