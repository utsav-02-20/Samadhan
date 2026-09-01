/**
 * ============================================================================
 * File: citizen.model.ts
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Defines the Mongoose schema and model for a Citizen in the Samadhan backend.
 *
 * Functionality:
 * - Stores authenticated citizen information received from Clerk.
 * - Maps each Clerk user to a MongoDB citizen document using `clerkId`.
 * - Saves citizen profile details such as name, email, phone number, and district.
 * - Automatically maintains createdAt and updatedAt timestamps.
 *
 * Used By:
 * - citizen.service.ts (register and fetch citizens)
 * - problem.model.ts (references citizenId for complaints)
 * ============================================================================
 */