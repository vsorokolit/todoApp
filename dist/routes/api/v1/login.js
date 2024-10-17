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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../../../models/User");
const router = (0, express_1.Router)();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body: ");
    console.log(req.body);
    const { login, pass } = req.body;
    try {
        const user = yield User_1.User.findOne({ login });
        if (user && user.password === pass) {
            req.session.user = { login };
            res.json({ ok: true, message: "Logged in successfully" });
        }
        else {
            res.status(401).json({ ok: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ ok: false, message: "Internal server error" });
    }
}));
exports.default = router;
