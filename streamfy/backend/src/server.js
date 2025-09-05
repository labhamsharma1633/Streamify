import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly from backend root
dotenv.config({ path: path.join(__dirname, "../.env") });

// Check loaded env vars
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL:", process.env.MONGO_URL ? "Loaded ✅" : "Missing ❌");
console.log("STREAM_API_KEY:", process.env.STREAM_API_KEY ? "Loaded ✅" : "Missing ❌");
console.log("STREAM_API_SECRET:", process.env.STREAM_API_SECRET ? "Loaded ✅" : "Missing ❌");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (!process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Connect to MongoDB first, then start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
