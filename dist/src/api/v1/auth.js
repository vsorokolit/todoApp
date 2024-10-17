"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.default = isAuthenticated;
