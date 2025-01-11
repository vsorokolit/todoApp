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
const express_1 = __importDefault(require("express"));
const routesItems_1 = require("./routesItems");
const routesAuth_1 = require("./routesAuth");
const router = express_1.default.Router();
router.all("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { action } = req.query;
    const userId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId && action !== "login" && action !== "register" && action !== "getItems" && action !== "logout") {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    switch (action) {
        case "getItems":
            (0, routesItems_1.getItems)(req, res);
            return;
        case "addItem":
            (0, routesItems_1.addItem)(req, res);
            return;
        case "editItem":
            (0, routesItems_1.editItem)(req, res);
            return;
        case "deleteItem":
            (0, routesItems_1.deleteItem)(req, res);
            return;
        case "login":
            (0, routesAuth_1.login)(req, res);
            return;
        case "logout":
            (0, routesAuth_1.logout)(req, res);
            return;
        case "register":
            (0, routesAuth_1.register)(req, res);
            return;
        default:
            res.status(400).json({ error: "Invalid action" });
            return;
    }
}));
exports.default = router;
