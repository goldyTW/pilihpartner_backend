import express from "express";
import multer from 'multer';
const router = express.Router();
import os from 'os';

import { signin, signup, getUsers, updateUser, getSingleUser,  userActivate, verifySignUp, checkEmail, resetPassword } from "../controllers/user.js";

router.post("/login", signin);
router.post("/register", multer({ dest: os.tmpdir() }).single('image'), signup);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.get("/:id", getSingleUser);
router.post("/verify", verifySignUp);
router.post("/checkemail", checkEmail);
router.get("/activate/:id", userActivate)
router.get("/resetpassword/:id", resetPassword)
export default router;