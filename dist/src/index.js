"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
app.use("/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Привіт, світ!!!");
});
app.listen(port, () => {
    console.log(`Сервер запущений на http://localhost:${port}`);
});
