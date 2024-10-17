import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Не вдалося вийти" });
      }
      res.json({ ok: true });
    });
  } else {
    res.status(400).json({ message: "Сесія не знайдена" });
  }
});

export default router;
