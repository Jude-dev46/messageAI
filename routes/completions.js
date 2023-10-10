const express = require("express");
const router = express.Router();
const completionsController = require("../controllers/completionController.mjs");

router.post("/", completionsController);

module.exports = router;
