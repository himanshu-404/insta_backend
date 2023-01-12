const express = require("express");
const authControllers = require("../controllers/authControllers");
const routes = express.Router();

routes.post("/login", authControllers.userLogin);
routes.post("/register", authControllers.userRegister);

module.exports = routes;
