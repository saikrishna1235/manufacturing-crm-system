import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

import dashboardRoutes
from "./routes/dashboardRoutes.js";

import userRoutes
from "./routes/userRoutes.js";
import reminderRoutes
from "./routes/reminderRoutes.js";
import performanceRoutes
from "./routes/performanceRoutes.js";
// Load ENV



// Connect Database

connectDB();

// Routes

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/reminders",
  reminderRoutes
);
app.use(
  "/api/performance",
  performanceRoutes
);
// Port

const PORT =
  process.env.PORT || 5000;

// Start Express Server

const server = app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);

// ============================
// Socket.IO Setup
// ============================

const io = new Server(server, {
  cors: {
    origin:
      "https://manufacturing-crm-system.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Make io globally accessible

global.io = io;

// Socket Connection

io.on(
  "connection",
  (socket) => {

    console.log(
      "User connected"
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "User disconnected"
        );

      }
    );
  }
);