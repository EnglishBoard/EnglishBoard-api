const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes');
const applySecurityMiddlewares = require("./middlewares/security");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

applySecurityMiddlewares(app);
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
