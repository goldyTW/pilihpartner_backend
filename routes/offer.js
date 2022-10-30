import express from "express";
const router = express.Router();

import { createOffer, deleteOffer, getOffer, updateOffer, getSingleOffer } from "../controllers/offer.js";
// import auth from "../middleware/auth.js";

router.post("/create", createOffer);
router.get("/:id", getOffer);
router.get("/single/:id/:idteam", getSingleOffer);
router.patch("/:id", updateOffer);
router.delete("/:id/:idteam", deleteOffer)
export default router;