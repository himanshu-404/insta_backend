const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

(async function () {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", require("./routes"));

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server, { cors: { origin: "*" } });

global.socketIo = io;
const { connection } = require("./socketIo");
io.on("connection", connection);
