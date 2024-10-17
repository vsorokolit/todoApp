import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../../models/User";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body: ");
  console.log(req.body);
  const { login, pass } = req.body;

  try {
    const user = await User.findOne({ login });

    if (user && user.password === pass) {
      req.session.user = { login };
      res.json({ ok: true, message: "Logged in successfully" });
    } else {
      res.status(401).json({ ok: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

export default router;
