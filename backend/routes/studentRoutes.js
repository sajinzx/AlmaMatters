const express = require("express");

const router = express.Router();

const controller = require("../controllers/studentController");

router.post("/register-step", controller.registerStep);

module.exports = router;