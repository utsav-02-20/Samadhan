import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend Connected 🚀",
  });
});

const PORT = Number(process.env.PORT) || 5000 ;

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});