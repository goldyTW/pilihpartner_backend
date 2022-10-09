import express from "express";
import { createMessage, getMessageByTeamID } from "../controllers/message.js";
const router = express.Router();

// import auth from "../middleware/auth.js";

router.post("/create", createMessage);
router.get("/:id", getMessageByTeamID);
export default router;