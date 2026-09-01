/**
 * ============================================================================
 * File: validate.middleware.js
 * Module: Middlewares
 * ============================================================================
 *
 * Purpose:
 * Generic Express middleware for validating requests using Zod schemas.
 *
 * Functionality:
 * - Validates req.body, req.params, req.query, or req.headers.
 * - Stops the request if validation fails.
 * - Returns standardized validation error responses.
 * - Passes validated data to the next middleware/controller.
 * ============================================================================
 */

import { ZodError } from "zod";

const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      // Validate and sanitize request data
      req[source] = schema.parse(req[source]);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Validation middleware error",
      });
    }
  };
};

export default validate;