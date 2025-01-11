import { Router, Request, Response, NextFunction } from "express";
import User from "../../../models/User";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { login, pass: password } = req.body;

  try {
    const user = await User.findOne({ login });

    if (!user) {
      res.status(401).json({ ok: false, message: "Invalid credentials" });
    } else if (user.password !== password) {
      res.status(401).json({ ok: false, message: "Invalid credentials" });
    } else {
      req.session.user = {
        id: user._id,
        login: user.login,
      };
      res.status(200).json({ ok: true, message: "Logged in successfully" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

export default router;
