const express = require("express");
const routes = express.Router();

const userRoutes = require("./userRoutes");

routes.use("/user", userRoutes);

module.exports = routes;
