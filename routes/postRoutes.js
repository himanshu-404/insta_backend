const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.user;
      const directory = `./images/uploads/${userId}`;

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      cb(null, directory);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
}).single("image");

const postControllers = require("../controllers/postControllers");

routes.post("/", postLimiter, upload, postControllers.postImage);

module.exports = routes;
