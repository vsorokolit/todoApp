import { Router, Request, Response, NextFunction } from "express";
import User from "../../../models/User";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body: ");
  console.log(req.body);

  const login = req.body.login,
    password = req.body.pass;

  try {
    // Знаходимо користувача за логіном
    const user = await User.findOne({ login });

    if (!user) {
      res.status(401).json({ ok: false, message: "Invalid credentials" });
    } else if (user.password !== password) {
      console.log("№№№№№№№№№№№№№ Хуйня пароль №№№№№№№№№№№№№№№№");
      console.log("user.password: " + user.password);
      console.log("password: " + password);
      // Перевіряємо пароль
      res.status(401).json({ ok: false, message: "Invalid credentials" });
    } else {
      // Якщо всі перевірки пройшли успішно
      res.status(200).json({ ok: true, message: "Logged in successfully" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

export default router;
