import express from "express";
const router = express.Router();

import { createOffer, getOffer, updateOffer } from "../controllers/offer.js";
// import auth from "../middleware/auth.js";

router.post("/create", createOffer);
router.get("/:id", getOffer);
router.patch("/:id", updateOffer);
export default router;