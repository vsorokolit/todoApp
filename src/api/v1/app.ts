import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import FileStore from "session-file-store";
import indexRouter from "../../../routes/api/v1/index";
import usersRouter from "../../../routes/users";
import itemsRouter from "../../../routes/api/v1/items";
import loginRouter from "../../../routes/api/v1/login";
import logoutRouter from "../../../routes/api/v1/logout";
import registerRouter from "../../../routes/api/v1/register";
import mongoose from "mongoose";

const app = express();

// Налаштування view engine
app.set("views", path.join(__dirname, "../../../../views"));
app.set("view engine", "pug");

app.use(logger("dev")); // щоб бачити запити в консолі (удобно)
app.use(express.json()); // дозволяє парсити JSON-запити
app.use(express.urlencoded({ extended: false })); // дозволяє парсити тіла запитів, надіслані через HTML-форми
app.use(cookieParser()); // дозволяє парсити cookies з HTTP-запитів
app.use(express.static(path.join(__dirname, "../../../../public"))); // налаштування папки з фронтом

// Налаштування сесій
const FileStoreInstance = FileStore(session);
app.use(
  session({
    store: new FileStoreInstance({}),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 360000 },
  })
);

// конектим монгодб
const db = "mongodb+srv://vsorokolit:blablabla123@clusterv.wsxg0.mongodb.net/todoAppDB?retryWrites=true&w=majority&appName=ClusterV"
mongoose
  .connect(db)
  .then((res) => console.log("Connected to DB hh"))
  .catch((error) => console.log(error))

// Підключаємо маршрути
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/register", registerRouter);

// Обробка помилок
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

export default app;
