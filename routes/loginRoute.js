const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers/authControllers");

router.post("/", loginController);

module.exports = router;
