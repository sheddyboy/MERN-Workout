import { Router } from "express";
import { login, signup, verifyToken } from "../controllers/userController";

const router = Router();

// Login
router.post("/login", login);

// Signup
router.post("/signup", signup);

// Verify token
router.post("/verify", verifyToken);

export default router;
