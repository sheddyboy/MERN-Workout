"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Static signup method
userSchema.statics.signupUser = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        if (!validator_1.default.isEmail(email)) {
            throw new Error("Email is invalid");
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw new Error("Password not strong enough");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw new Error("User already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield this.create({ email, password: hashedPassword });
        return user;
    });
};
// static login method
userSchema.statics.loginUser = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validation
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid password");
        }
        return user;
    });
};
// export default <any>model("User", userSchema);
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
