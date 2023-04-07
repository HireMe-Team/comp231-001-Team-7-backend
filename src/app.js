const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const app = express();

const api = require("./routes/api");
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret",
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:3000",
      "https://amazing-tartufo-eb2458.netlify.app/",
    ],
  })
);
app.use(morgan("tiny"));
app.use(passport.initialize());

app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", api);
app.get("/*", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
