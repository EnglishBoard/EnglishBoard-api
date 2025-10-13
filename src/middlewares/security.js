// middlewares/security.js

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");

const applySecurityMiddlewares = (app) => {
  app.use(helmet());

  app.use(morgan("dev"));

  app.use(cors({
  origin: [
    "http://127.0.0.1:3000",
    "https://linked29-sys.github.io",
    "http://192.168.1.2:3000"
  ],
  optionsSuccessStatus: 200
  }));


/*
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: {
      error: "Too many requests, please try again later."
    }
  });

  app.use(limiter);*/
};

module.exports = applySecurityMiddlewares;
