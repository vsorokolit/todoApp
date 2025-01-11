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
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const User_1 = __importDefault(require("../../../models/User"));
let taskList = {
    items: [
        { id: 1, text: "залогінься", checked: false },
        { id: 2, text: "залогінься", checked: false },
        { id: 3, text: "залогінься", checked: false },
    ],
};
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
    if (user) {
        res.json(user.taskList);
    }
    else {
        res.json(taskList);
    }
});
exports.getItems = getItems;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserOrNull(req, res);
        if (!user)
            return;
        const { text } = req.body;
        user.taskList.items.push({
            id: ++user.taskList.lastItemID,
            text: text,
            checked: false,
        });
        yield user.save();
        res.json({ id: user.taskList.lastItemID });
    }
    catch (error) {
        res.status(500).json({ message: "Сталася помилка при додаванні завдання." });
    }
});
exports.addItem = addItem;
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserOrNull(req, res);
        if (!user)
            return;
        const { text, id, checked } = req.body;
        const task = user.taskList.items.find((item) => item.id === id);
        if (task != undefined) {
            task.text = text;
            task.checked = checked;
        }
        yield user.save();
        res.json({ ok: true });
    }
    catch (error) {
        res.status(500).json({ message: "Сталася помилка при оновленні завдання." });
    }
});
exports.editItem = editItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserOrNull(req, res);
        if (!user)
            return;
        const { id } = req.body;
        const taskIndex = user.taskList.items.findIndex((item) => item.id === Number(id));
        if (taskIndex === -1) {
            res.status(500).json({ message: "Завдання не знайдено." });
            return;
        }
        user.taskList.items.splice(taskIndex, 1);
        yield user.save();
        res.json({ ok: true });
    }
    catch (error) {
        res.status(500).json({ message: "Сталася помилка при видаленні завдання." });
    }
});
exports.deleteItem = deleteItem;
const getUserOrNull = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findById((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id);
    if (user == null) {
        res.status(500).json({ message: "Сталася помилка при виконанні операції." });
        return null;
    }
    return user;
});
