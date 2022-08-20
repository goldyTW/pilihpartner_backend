import express from "express";
const router = express.Router();

import { createTeam, getTeam, updateTeam, getMyTeam } from "../controllers/team.js";
// import auth from "../middleware/auth.js";

router.post("/create", createTeam);
router.get("/", getTeam);
router.get("/:id", getMyTeam);
router.patch("/:id", updateTeam);
export default router;