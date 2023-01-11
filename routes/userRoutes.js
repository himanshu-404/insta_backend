const express = require("express");
const userControllers = require("../controllers/authControllers");
const routes = express.Router();

routes.post("/login", userControllers.userLogin);
routes.post("/register", userControllers.userRegister);

module.exports = routes;
