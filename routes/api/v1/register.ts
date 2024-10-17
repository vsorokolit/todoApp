import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../../models/User";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;

  const user = new User({ login, password });
  try {
    await user.save();
    console.log("user saved ##########################")
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log("user NOT saved ##########################")
    res.status(200).json({ error: false });
  }
});

export default router;
