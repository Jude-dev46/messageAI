const express = require("express");
const router = express.Router();
const { signUpController } = require("../controllers/authControllers");

router.post("/", signUpController);

module.exports = router;
