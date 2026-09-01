/**
 * ============================================================================
 * File: auth.middleware.js
 * Module: Middlewares
 * ============================================================================
 *
 * Purpose:
 * Verifies Clerk authentication tokens for protected APIs.
 *
 * Functionality:
 * - Reads the Bearer token from the Authorization header.
 * - Verifies the JWT using Clerk.
 * - Extracts authenticated citizen information.
 * - Attaches the user to `req.user`.
 * - Returns 401 for missing or invalid tokens.
 * ============================================================================
 */

import { verifyToken } from "@clerk/backend";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // Attach authenticated user details to request
    req.user = {
      clerkId: payload.sub,
      sessionId: payload.sid,
      email: payload.email || null,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

export default authMiddleware;