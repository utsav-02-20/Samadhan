//firstly changed ts.config.json to allow js

# Government Module

## Purpose

The Government module provides administrative control over
societal challenges submitted through the platform.

## Responsibilities

- View submitted challenges
- Validate challenges
- Reject invalid challenges
- Assign challenges to departments
- Monitor challenge progress
- View platform statistics
- Maintain audit history

## Module Structure

government/
├── controllers/
├── models/
├── routes/
├── services/
├── validators/
└── index.js

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/government/dashboard | Dashboard statistics |
| GET | /api/government/challenges | List challenges |
| GET | /api/government/challenges/:id | Get challenge |
| PATCH | /api/government/challenges/:id/validate | Validate |
| PATCH | /api/government/challenges/:id/reject | Reject |
| PATCH | /api/government/challenges/:id/assign | Assign department |

## Authentication

All endpoints require authenticated users.

## Authorization

Only Government administrators can perform validation
and assignment operations.