import completionsController from "../controllers/completionController.mjs";
import express from "express";
const router = express.Router();

router.post("/", completionsController);

export default router;
