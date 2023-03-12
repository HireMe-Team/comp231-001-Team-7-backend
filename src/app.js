const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("short"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/*", (req, res) => {
  res.send("Hello World");
});


module.exports = app;