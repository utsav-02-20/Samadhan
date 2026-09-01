/**
 * ============================================================================
 * File: app.js
 * Module: App
 * ============================================================================
 *
 * Purpose:
 * Creates and configures the Express application.
 *
 * Functionality:
 * - Enables CORS for the Next.js frontend.
 * - Parses JSON and URL-encoded request bodies.
 * - Registers all API routes.
 * - Provides a health check endpoint.
 * - Handles 404 routes.
 * - Includes a global error handling middleware.
 * ============================================================================
 */

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

/* -------------------------------------------------------------------------- */
/* Middlewares                                                                 */
/* -------------------------------------------------------------------------- */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */
/* API Routes                                                                  */
/* -------------------------------------------------------------------------- */

app.use("/api/v1", routes);

/* -------------------------------------------------------------------------- */
/* Health Check                                                                */
/* -------------------------------------------------------------------------- */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Samadhan Backend Connected Successfully",
  });
});

/* -------------------------------------------------------------------------- */
/* 404 Handler                                                                 */
/* -------------------------------------------------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------------------------------------------------------------- */
/* Global Error Handler                                                        */
/* -------------------------------------------------------------------------- */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;