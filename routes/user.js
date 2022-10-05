import express from "express";
import multer from 'multer';
const router = express.Router();
import os from 'os';

import { signin, signup, getUsers, updateUser, getSingleUser,  userActivate, verifySignUp, checkEmail, resetPassword, signinGoogle, verifyGoogle, signupGoogle } from "../controllers/user.js";

router.post("/login", signin);
router.post("/logingoogle", signinGoogle);
router.post("/register", multer({ dest: os.tmpdir() }).single('image'), signup);
router.post("/registergoogle", signupGoogle);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.get("/:id", getSingleUser);
router.post("/verify", verifySignUp);
router.post("/verifygoogle", verifyGoogle);
router.post("/checkemail", checkEmail);
router.get("/activate/:id", userActivate)
router.get("/resetpassword/:id", resetPassword)
export default router;