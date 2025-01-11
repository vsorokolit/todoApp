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
exports.register = exports.logout = exports.login = void 0;
const User_1 = __importDefault(require("../../../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pass: password } = req.body;
    try {
        const user = yield User_1.default.findOne({ login });
        if (!user) {
            res.status(401).json({ ok: false, message: "Invalid credentials" });
        }
        else if (user.password !== password) {
            res.status(401).json({ ok: false, message: "Invalid credentials" });
        }
        else {
            req.session.user = {
                id: user._id,
                login: user.login,
            };
            res.status(200).json({ ok: true, message: "Logged in successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Не вдалося вийти" });
            }
            res.json({ ok: true });
        });
    }
    else {
        res.status(400).json({ message: "Сесія не знайдена" });
    }
};
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login, password = req.body.pass;
    try {
        const existingUser = yield User_1.default.findOne({ login });
        if (existingUser) {
            res.status(400).json({ ok: false, message: "User already exists" });
        }
        else {
            const newUser = new User_1.default({ login, password });
            yield newUser.save();
            res.status(201).json({ ok: true, message: "User registered successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
});
exports.register = register;
