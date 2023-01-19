const express = require("express");
const path = require("path");
const { verifyToken } = require("../config/verifyUser");
const routes = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

routes.use("/auth", authRoutes);
routes.use(verifyToken);
routes.use("/user", userRoutes);
routes.use("/post", postRoutes);

module.exports = routes;
