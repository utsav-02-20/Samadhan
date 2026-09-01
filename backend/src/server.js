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
  try {
    // Connect MongoDB
    if (!MONGO_URI) {
      throw new Error("MongoDB connection string is missing in .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();