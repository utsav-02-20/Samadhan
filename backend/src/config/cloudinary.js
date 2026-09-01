/**
 * ============================================================================
 * File: cloudinary.js
 * Module: Config
 * ============================================================================
 *
 * Purpose:
 * Configures the Cloudinary SDK using environment variables.
 *
 * Functionality:
 * - Initializes Cloudinary with credentials from `.env`.
 * - Exports a reusable Cloudinary instance.
 * - Used for uploading and managing complaint images.
 * ============================================================================
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;