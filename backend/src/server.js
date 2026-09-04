/**
 * ============================================================================
 * File: server.js
 * Module: Server
 * ============================================================================
 *
 * Purpose:
 * Entry point of the Samadhan backend server.
 *
 * Functionality:
 * - Loads environment variables.
 * - Connects to MongoDB.
 * - Starts the Express server on the configured port.
 * ============================================================================
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const startServer = async () => {
  // Start Express server first so Render/cloud platforms pass HTTP health checks
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Connect MongoDB with retry / non-blocking catch
  if (!MONGO_URI) {
    console.error("MongoDB connection string is missing in environment variables.");
    return;
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
      console.error("MongoDB Connection Warning (Retrying in background):", err.message);
    });
};

startServer();