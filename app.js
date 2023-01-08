const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
require("./config/dbConnection");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wel-come to the server");
});

app.use("/", require("./routes"));

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server, { cors: { origin: "*" } });

global.socketIo = io;
const { connection } = require("./socketIo");
io.on("connection", connection);
