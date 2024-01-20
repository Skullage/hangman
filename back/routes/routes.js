import express from "express";
import { sendFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.post("/feedback/send", sendFeedback);
export default router;
