const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes");
const applySecurityMiddlewares = require("./middlewares/security");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Seguridad + middlewares
applySecurityMiddlewares(app);
app.use(express.json());

app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState; 
  res.status(200).json({
    status: "ok",
    db: dbState === 1 ? "connected" : "not-connected"
  });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});
