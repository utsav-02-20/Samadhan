backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.ts
│   │   ├── env.ts
│   │   ├── clerk.ts
│   │   ├── cloudinary.ts
│   │   └── redis.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rateLimiter.middleware.ts
│   │
│   ├── utils/
│   │   ├── ApiResponse.ts
│   │   ├── ApiError.ts
│   │   ├── asyncHandler.ts
│   │   ├── logger.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── services/                     # Shared services
│   │   ├── cloudinary.service.ts
│   │   ├── notification.service.ts
│   │   ├── location.service.ts
│   │   └── email.service.ts
│   │
│   ├── modules/                      # Every entity lives here
│   │
│   │   ├── citizen/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── validators/
│   │   │   └── index.ts
│   │   │
│   │   ├── university/               # Add later
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── validators/
│   │   │   └── index.ts
│   │   │
│   │   ├── government/               # Add later
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── validators/
│   │   │   └── index.ts
│   │   │
│   │   └── department/               # Add later
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── validators/
│   │       └── index.ts
│   │
│   ├── routes/
│   │   └── index.ts                  # Mount all module routes
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md