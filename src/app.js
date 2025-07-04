// Global environment variables
require("dotenv").config();

// DEPENDENCIESbruno bucciarati mangamuppe
// External dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// Internal dependencies
const routes = require("./_constants/routes");
const usersRouter = require("./user/user.router");
const chatsRouter = require("./chat/chat.router");
const { CORS_ORIGIN_WHITELIST } = require("./_config");

// CORS options
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Express app rules
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use(routes.USERS, usersRouter);
app.use(routes.CHATS, chatsRouter);

// Error handling
app.use((err, req, res, next) => {
  console.log("ERROR:" + JSON.stringify(err));

  // By default, assume internal server error
  let status = 500;
  if (err.status)
    status = err.status

  // Return error status and message
  res.status(status).json(err);
});

// Database handling
const db = require("./_db");
db.mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = app;
