const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');
const applySecurityMiddlewares = require("./middlewares/security");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

applySecurityMiddlewares(app);
app.use(express.json());

app.use("/", router);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
