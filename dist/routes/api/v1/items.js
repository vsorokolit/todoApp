"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../src/api/v1/auth"));
const router = (0, express_1.Router)();
let taskList = {
    items: [
        { id: 1, text: "зробити щось одне", checked: false },
        { id: 2, text: "зробити щось друге", checked: false },
        { id: 3, text: "зробити щось третє", checked: false },
    ],
};
let itemsID = 3;
router.get("/", (req, res, next) => {
    res.json(taskList);
});
router.post("/", auth_1.default, (req, res, next) => {
    const { text } = req.body;
    console.log(req.body);
    itemsID++;
    taskList.items.push({
        id: itemsID,
        text: text + " " + itemsID,
        checked: false,
    });
    res.json({ id: itemsID });
});
router.put("/", auth_1.default, (req, res, next) => {
    const { text, id, checked } = req.body;
    console.log("req.body: ");
    console.log(req.body);
    let searchItem = taskList.items.find((item) => item.id == id);
    console.log("searchItem: ");
    console.log(searchItem);
    if (searchItem === undefined) {
        res.json({ error: false });
    }
    else {
        searchItem.text = text;
        searchItem.checked = checked;
        console.log("searchItem: ");
        console.log(searchItem);
        res.json({ ok: true });
    }
});
router.delete("/", auth_1.default, (req, res, next) => {
    const { text, id, checked } = req.body;
    console.log("req.body: ");
    console.log(req.body);
    let itemIndex = taskList.items.findIndex((item) => item.id == id);
    console.log("itemIndex: ");
    console.log(itemIndex);
    if (itemIndex === -1) {
        res.json({ error: false });
    }
    else {
        taskList.items.splice(itemIndex, 1);
        res.json({ ok: true });
    }
});
exports.default = router;
