# Frontend Documentation — Samadhan Setu (Citizen + University)

Production-ready Next.js frontend architecture for SIH 2026.

---

## Root Structure

```text
frontend/
├── src/
├── public/
├── .env.local
├── .env.example
├── middleware.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

| Folder / File | Purpose |
|---|---|
| `src/` | Main application source code. |
| `public/` | Static assets (logos, favicon, images). |
| `.env.local` | Local environment variables. |
| `.env.example` | Sample environment variables for teammates. |
| `middleware.ts` | Clerk authentication and route protection. |
| `next.config.ts` | Next.js configuration. |
| `tsconfig.json` | TypeScript configuration. |
| `package.json` | Project dependencies and scripts. |

---

# `src/app/` — Routing Layer

Contains only pages and layouts. No business logic.

## Public Routes

```text
app/
└── (public)/
    ├── page.tsx
    ├── login/
    └── signup/
```

| Route | Use |
|---|---|
| `/` | Landing page. |
| `/login` | Clerk login page. |
| `/signup` | Clerk signup page. |

## Citizen Routes

```text
app/
└── citizen/
    ├── layout.tsx
    ├── dashboard/
    ├── grievances/
    ├── grievances/new/
    └── profile/
```

| Route | Use |
|---|---|
| `layout.tsx` | Citizen layout with sidebar/navbar. |
| `/citizen/dashboard` | Dashboard overview. |
| `/citizen/grievances` | View all grievances. |
| `/citizen/grievances/new` | Create grievance form. |
| `/citizen/profile` | Citizen profile page. |

## University Routes

```text
app/
└── university/
    ├── layout.tsx
    ├── dashboard/
    ├── challenges/
    ├── submissions/
    └── profile/
```

| Route | Use |
|---|---|
| `layout.tsx` | University layout. |
| `/university/dashboard` | University dashboard. |
| `/university/challenges` | Browse challenges. |
| `/university/submissions` | Manage submissions. |
| `/university/profile` | University profile page. |

## Global App Files

| File | Use |
|---|---|
| `layout.tsx` | Root application layout. |
| `globals.css` | Global Tailwind and custom styles. |
| `favicon.ico` | Website favicon. |

---

# `src/components/` — Shared UI

Reusable UI across Citizen and University.

```text
components/
├── ui/
├── layout/
└── common/
```

## `ui/`
Shared shadcn components.

- Button
- Input
- Card
- Dialog
- Table
- Badge

## `layout/`

| Component | Use |
|---|---|
| `Navbar.tsx` | Top navigation bar. |
| `Sidebar.tsx` | Dashboard sidebar. |
| `Footer.tsx` | Footer component. |

## `common/`

| Component | Use |
|---|---|
| `Loader.tsx` | Loading spinner. |
| `EmptyState.tsx` | Empty data screen. |
| `PageHeader.tsx` | Common page header. |

---

# `src/features/` — Business Logic

Each feature contains its own UI, hooks, services, and validation.

```text
features/
├── auth/
├── citizen/
└── university/
```

## `auth/`

Authentication-related logic.

- Clerk helpers.
- Login state.
- User session handling.

## `citizen/`

```text
citizen/
├── components/
├── hooks/
├── services/
└── schema.ts
```

| Folder / File | Use |
|---|---|
| `components/` | Grievance UI components. |
| `hooks/` | Citizen custom hooks. |
| `services/` | Citizen API requests. |
| `schema.ts` | Zod validation schema. |

## `university/`

```text
university/
├── components/
├── hooks/
├── services/
└── schema.ts
```

| Folder / File | Use |
|---|---|
| `components/` | Challenge and submission UI. |
| `hooks/` | University custom hooks. |
| `services/` | University API requests. |
| `schema.ts` | Zod validation schema. |

---

# `src/services/` — API Layer

All backend communication.

```text
services/
├── api.ts
├── auth.service.ts
├── citizen.service.ts
└── university.service.ts
```

| File | Use |
|---|---|
| `api.ts` | Axios configuration and interceptors. |
| `auth.service.ts` | Authentication APIs. |
| `citizen.service.ts` | Citizen APIs. |
| `university.service.ts` | University APIs. |

---

# `src/lib/` — Config & Utilities

```text
lib/
├── axios.ts
├── env.ts
├── clerk.ts
└── utils.ts
```

| File | Use |
|---|---|
| `axios.ts` | Axios client instance. |
| `env.ts` | Environment variable helpers. |
| `clerk.ts` | Clerk utilities. |
| `utils.ts` | Common helper functions. |

---

# `src/hooks/` — Global Hooks

```text
hooks/
├── useAuth.ts
└── useUpload.ts
```

| Hook | Use |
|---|---|
| `useAuth.ts` | Authenticated user/session hook. |
| `useUpload.ts` | File upload hook. |

---

# `src/store/` — Global State

```text
store/
├── auth.store.ts
└── user.store.ts
```

| Store | Use |
|---|---|
| `auth.store.ts` | Authentication state. |
| `user.store.ts` | Logged-in user state. |

---

# `src/types/` — Type Definitions

```text
types/
├── api.types.ts
├── citizen.types.ts
└── university.types.ts
```

| File | Use |
|---|---|
| `api.types.ts` | Common API interfaces. |
| `citizen.types.ts` | Citizen models. |
| `university.types.ts` | University models. |

---

# `src/assets/` — Static Assets

```text
assets/
├── images/
└── icons/
```

| Folder | Use |
|---|---|
| `images/` | Images and illustrations. |
| `icons/` | SVG icons and logos. |

---

# `src/providers/` — Global Providers

```text
providers/
├── ClerkProvider.tsx
└── QueryProvider.tsx
```

| Provider | Use |
|---|---|
| `ClerkProvider.tsx` | Clerk authentication provider. |
| `QueryProvider.tsx` | TanStack React Query provider. |

---

# Route Summary

| URL | Purpose |
|---|---|
| `/` | Landing page. |
| `/login` | Login page. |
| `/signup` | Signup page. |
| `/citizen/dashboard` | Citizen dashboard. |
| `/citizen/grievances` | View grievances. |
| `/citizen/grievances/new` | Create grievance. |
| `/citizen/profile` | Citizen profile. |
| `/university/dashboard` | University dashboard. |
| `/university/challenges` | Challenge list. |
| `/university/submissions` | Submission management. |
| `/university/profile` | University profile. |

---

# Architecture Rules

- `app/` → Routes and layouts only.
- `features/` → Feature-specific business logic.
- `components/` → Shared reusable UI.
- `services/` → Express backend API calls.
- `lib/` → Configuration and utilities.
- `hooks/` → Custom React hooks.
- `store/` → Global Zustand state.
- `types/` → Shared TypeScript interfaces.
- `providers/` → Global providers (Clerk, React Query).
- `assets/` → Static images and icons only.
