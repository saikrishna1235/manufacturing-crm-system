import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin:
      "https://manufacturing-crm-system.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", analyticsRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;