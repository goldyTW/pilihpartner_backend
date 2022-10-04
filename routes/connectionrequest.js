import express from "express";
import { createConnectionRequest, getConnectionRequest, updateConnectionRequest } from "../controllers/connectionrequest.js";
const router = express.Router();

// import auth from "../middleware/auth.js";

router.post("/create", createConnectionRequest);
router.get("/", getConnectionRequest);
router.patch("/:id", updateConnectionRequest);
export default router;