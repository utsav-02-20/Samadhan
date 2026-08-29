                         SAMADHAN-SETU
                              │
                              ▼
                             SIH/
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
      Frontend/            Backend/            database/
          │                   │                   │
          │          ┌────────┴────────┐     ┌────┼────┐
          │          │                 │     │    │    │
          │          ▼                 ▼     ▼    ▼    ▼
          │    platform-api/       ai-service/ migrations
          │          │                 │       schemas
          │          │                 │       seeds
          │          ▼                 ▼
          │      Express API        FastAPI
          │          │                 │
          │          ├── auth          ├── API routes
          │          ├── challenges    ├── core
          │          ├── review        ├── schemas
          │          ├── institutions  ├── services
          │          ├── projects      ├── models
          │          ├── partners      ├── repositories
          │          ├── notifications ├── workers
          │          └── analytics     └── tests
          │
          ▼
    Next.js PWA
          │
          ├── (public)
          │     └── Landing / Sign-in / Challenge Reporting
          │
          ├── (dashboard)
          │     └── Role-based Dashboards
          │
          ├── components/
          │     ├── ui/
          │     └── features/
          │
          ├── lib/
          ├── hooks/
          ├── types/
          └── public/


                              SIH/
                               │
             ┌─────────────────┼──────────────────┐
             │                 │                  │
             ▼                 ▼                  ▼
      infrastructure/        docs/             scripts/
             │                 │                  │
       ┌─────┼─────┐      ┌────┼─────┐            │
       ▼     ▼     ▼      ▼    ▼     ▼            ▼
     docker nginx monitoring architecture api product
       │                 │
       │                 └── Technical Docs
       │
       └── PostgreSQL + RabbitMQ


                              │
                              ▼
                       .github/workflows/
                              │
                              ▼
                           CI/CD