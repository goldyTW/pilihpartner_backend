import express from "express";
import { createDeleteRequest, getPerID } from "../controllers/deleterequest.js";
const router = express.Router();

// import auth from "../middleware/auth.js";

router.post("/create", createDeleteRequest);
router.get("/:id", getPerID);
export default router;