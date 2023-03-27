"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const workoutRouter_1 = __importDefault(require("./routes/workoutRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONG_URI = process.env.MONG_URI;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Routes
app.use("/api/workouts", workoutRouter_1.default);
app.use("/api/user", userRouter_1.default);
mongoose_1.default
    .connect(MONG_URI)
    .then(() => {
    var _a;
    app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000, () => {
        console.log(`listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log("Error", err);
});
exports.default = app;
