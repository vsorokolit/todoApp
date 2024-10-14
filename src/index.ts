import express from "express";
import usersRouter from "../routes/users";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../../public")));

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Привіт, світ!!!");
});

app.listen(port, () => {
  console.log(`Сервер запущений на http://localhost:${port}`);
});
