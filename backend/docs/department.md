# Department Module

## Purpose

The Department module manages challenges assigned by Government
and coordinates their technical/domain-level processing.

## Responsibilities

- View assigned challenges
- Review challenges
- Accept challenges
- Reject challenges
- Request additional information
- Assign challenges/projects
- Track project progress

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/departments/:id | Get department |
| GET | /api/departments/:id/dashboard | Dashboard |
| GET | /api/departments/:id/challenges | Assigned challenges |
| PATCH | /api/departments/:id/challenges/:challengeId/accept | Accept |
| PATCH | /api/departments/:id/challenges/:challengeId/reject | Reject |
| PATCH | /api/departments/:id/challenges/:challengeId/request-info | Request info |