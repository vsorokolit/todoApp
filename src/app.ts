import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import FileStore from "session-file-store";
import indexRouter from "../routes/api/v1/index";
import itemsRouter from "../routes/api/v1/items";
import loginRouter from "../routes/api/v1/login";
import logoutRouter from "../routes/api/v1/logout";
import registerRouter from "../routes/api/v1/register";
import mongoose from "mongoose";
import cors from "cors";
import router from "../routes/api/v2/router";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// view engine
app.set("views", path.join(__dirname, "../../../../views"));
app.set("view engine", "pug");

app.use(logger("dev")); // щоб бачити запити в консолі (удобно)
app.use(express.json()); // дозволяє парсити JSON-запити
app.use(express.urlencoded({ extended: false })); // дозволяє парсити тіла запитів, надіслані через HTML-форми
app.use(cookieParser()); // дозволяє парсити cookies з HTTP-запитів
app.use(express.static(path.join(__dirname, "../../../../public"))); // налаштування папки з фронтом

// Sessions
const FileStoreInstance = FileStore(session);
app.use(
  session({
    store: new FileStoreInstance({}),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // ms * s * m * h * d
  })
);

// MongoDB
const db = process.env.MONGODB_URL || "";
mongoose
  .connect(db)
  .then((res) => console.log("Connected to MongoDB."))
  .catch((error) => console.log(error));

// cors
app.use(
  cors({
    origin: "http://localhost:8080", // Дозволити запити лише з цього порту
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволені методи
    credentials: true, // Дозволити передавати cookies
  })
);

// Підключаємо маршрути
app.use("/", indexRouter);
app.use("/api/v2/router", router);
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/register", registerRouter);

// Обробка помилок
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

export default app;
