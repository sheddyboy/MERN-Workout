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
exports.verifyToken = exports.signup = exports.login = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.loginUser(email, password);
        // create a new token
        const token = createToken(user.id);
        res.status(200).json({ email, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.signupUser(email, password);
        // create a new token
        const token = createToken(user === null || user === void 0 ? void 0 : user._id);
        res.status(200).json({ email, token });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});
exports.signup = signup;
const verifyToken = (req, res) => {
    const token = req.body.token;
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
        if (err)
            return res.status(400).json(err);
        const { _id } = decoded;
        console.log("hi");
        userModel_1.default
            .findById(_id)
            .then((user) => {
            res.status(200).json({ user, token });
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    });
};
exports.verifyToken = verifyToken;
