const express = require("express");
const routes = express.Router();

const userControllers = require("../controllers/userControllers");

routes.post("/:userId/follow", userControllers.followUser);

module.exports = routes;
