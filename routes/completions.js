const express = require("express");
const router = express.Router();
const completionsController = require("../controllers/completionController");

router.post("/", completionsController);

module.exports = router;
