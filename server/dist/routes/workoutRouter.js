"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = require("../controllers/workoutController");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = (0, express_1.Router)();
// Require authorization for all routes
router.use(requireAuth_1.default);
router.get("/", workoutController_1.getWorkouts);
router.get("/:id", workoutController_1.getWorkout);
router.post("/", workoutController_1.createWorkout);
router.delete("/:id", workoutController_1.deleteWorkout);
router.patch("/:id", workoutController_1.updateWorkout);
exports.default = router;
