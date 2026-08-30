import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend Connected 🚀",
  });
});

export default app;