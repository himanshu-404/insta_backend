const express = require("express");
const { verifyToken } = require("../config/verifyUser");
const routes = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

routes.use("/auth", authRoutes);
routes.use(verifyToken);
routes.use("/user", userRoutes);

module.exports = routes;
