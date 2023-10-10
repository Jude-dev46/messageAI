import completionsController from "../controllers/completionController.mjs";
const express = require("express");
const router = express.Router();

router.post("/", completionsController);

module.exports = router;
