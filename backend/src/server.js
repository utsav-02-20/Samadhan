/**
 * File: server.js
 * Entry point - loads env, connects MongoDB, starts Express server
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function startServer() {
  try {
    if (!MONGO_URI) {
      console.warn("MONGO_URI not found in .env - starting server without DB");
    } else {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected");
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();