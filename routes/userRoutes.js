const express = require("express");
const routes = express.Router();

const userControllers = require("../controllers/userControllers");

routes.post("/:userId/follow", userControllers.followUser);

routes.post("/:userId/:offset/followers", userControllers.getFollowersByUserId);
routes.post("/:userId/:offset/following", userControllers.getFollowingByUserId);

module.exports = routes;
