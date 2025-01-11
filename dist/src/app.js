"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const index_1 = __importDefault(require("../routes/api/v1/index"));
const items_1 = __importDefault(require("../routes/api/v1/items"));
const login_1 = __importDefault(require("../routes/api/v1/login"));
const logout_1 = __importDefault(require("../routes/api/v1/logout"));
const register_1 = __importDefault(require("../routes/api/v1/register"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../routes/api/v2/router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// view engine
app.set("views", path_1.default.join(__dirname, "../../../../views"));
app.set("view engine", "pug");
app.use((0, morgan_1.default)("dev")); // щоб бачити запити в консолі (удобно)
app.use(express_1.default.json()); // дозволяє парсити JSON-запити
app.use(express_1.default.urlencoded({ extended: false })); // дозволяє парсити тіла запитів, надіслані через HTML-форми
app.use((0, cookie_parser_1.default)()); // дозволяє парсити cookies з HTTP-запитів
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../../public"))); // налаштування папки з фронтом
// Sessions
const FileStoreInstance = (0, session_file_store_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    store: new FileStoreInstance({}),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // ms * s * m * h * d
}));
// MongoDB
const db = process.env.MONGODB_URL || "";
mongoose_1.default
    .connect(db)
    .then((res) => console.log("Connected to MongoDB."))
    .catch((error) => console.log(error));
// cors
app.use((0, cors_1.default)({
    origin: "http://localhost:8080", // Дозволити запити лише з цього порту
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволені методи
    credentials: true, // Дозволити передавати cookies
}));
// Підключаємо маршрути
app.use("/", index_1.default);
app.use("/api/v2/router", router_1.default);
app.use("/api/v1/items", items_1.default);
app.use("/api/v1/login", login_1.default);
app.use("/api/v1/logout", logout_1.default);
app.use("/api/v1/register", register_1.default);
// Обробка помилок
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});
exports.default = app;
