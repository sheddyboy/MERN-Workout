import { Router } from "express";
import { login, signup } from "../controllers/userController";

const router = Router();

// Login
router.post("/login", login);

// Signup
router.post("/signup", signup);

export default router;
