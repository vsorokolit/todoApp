import { Router, Request, Response, NextFunction } from "express";
import User from "../../../models/User";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body.login,
    password = req.body.pass;
  console.log(login);
  console.log(password);

  try {
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      res.status(400).json({ ok: false, message: "User already exists" });
    } else {
      const newUser = new User({ login, password });
      await newUser.save();

      res.status(201).json({ ok: true, message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

export default router;
