"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res, next) => {
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
});
exports.default = router;
