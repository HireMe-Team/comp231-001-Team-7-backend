const http = require("http");
require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const SERVER = http.createServer(app);

async function startServer() {
  // TDDO: Connecting to MongoDB.

  SERVER.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
