/**
 * ============================================================================
 * File: citizen.model.js
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
 * - citizen.service.js (register and fetch citizens)
 * - problem.model.js (references citizenId for complaints)
 * ============================================================================
 */

import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        district: {
            type: String,
            required: true,
            trim: true,
        },

        profileComplete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Citizen = mongoose.model("Citizen", citizenSchema);

export default Citizen;