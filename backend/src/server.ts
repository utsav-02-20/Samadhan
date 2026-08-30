import dotenv from "dotenv";
import app from "./src/app.js";
dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});