import express from "express";
import multer from 'multer';
const router = express.Router();
import os from 'os';

import { signin, signup, getUsers, updateUser, getSingleUser, verifyLogin } from "../controllers/user.js";

router.post("/login", signin);
router.post("/register", multer({ dest: os.tmpdir() }).single('image'), signup);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.get("/:id", getSingleUser);
router.post("/verify", verifyLogin);
export default router;