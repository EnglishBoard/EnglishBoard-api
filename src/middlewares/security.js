// middlewares/security.js

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");

const applySecurityMiddlewares = (app) => {
  app.use(helmet());

  app.use(morgan("dev"));

  app.use(cors({
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      error: "Too many requests, please try again later."
    }
  });

  app.use(limiter);
};

module.exports = applySecurityMiddlewares;
