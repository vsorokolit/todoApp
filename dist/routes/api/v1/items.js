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
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../src/auth"));
const User_1 = __importDefault(require("../../../models/User"));
const router = (0, express_1.Router)();
let taskList = {
    items: [
        { id: 1, text: "залогінься", checked: false },
        { id: 2, text: "залогінься", checked: false },
        { id: 3, text: "залогінься", checked: false },
    ],
};
//get all items
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
    if (user == null) {
        res.json(taskList);
    }
    else {
        res.json(user.taskList);
    }
}));
//put item
router.post("/", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
        const { text } = req.body;
        if (user != null) {
            user.taskList.items.push({
                id: ++user.taskList.lastItemID,
                text: text,
                checked: false,
            });
            yield user.save();
            res.json({ id: user.taskList.lastItemID });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Сталася помилка при додаванні завдання." });
    }
}));
//change item
router.put("/", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
        const { text, id, checked } = req.body;
        if (user != null) {
            const task = user.taskList.items.find((item) => item.id === id);
            if (task != undefined) {
                task.text = text;
                task.checked = checked;
            }
            yield user.save();
            res.json({ ok: true });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Сталася помилка при оновленні завдання." });
    }
}));
//delete item
router.delete("/", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
        const { id } = req.body;
        if (user != null) {
            const taskIndex = user.taskList.items.findIndex((item) => item.id === Number(id));
            if (taskIndex === -1) {
                res.status(404).json({ message: "Завдання не знайдено." });
            }
            else {
                user.taskList.items.splice(taskIndex, 1);
                yield user.save();
                res.json({ ok: true });
            }
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Сталася помилка при видаленні завдання." });
    }
}));
exports.default = router;
