"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Login
router.post("/login", userController_1.login);
// Signup
router.post("/signup", userController_1.signup);
// Verify token
router.post("/verify", userController_1.verifyToken);
exports.default = router;
