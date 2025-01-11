import { Router, Request, Response, NextFunction } from "express";
import isAuthenticated from "../../../src/auth";
import User from "../../../models/User";

const router = Router();

let taskList = {
  items: [
    { id: 1, text: "залогінься", checked: false },
    { id: 2, text: "залогінься", checked: false },
    { id: 3, text: "залогінься", checked: false },
  ],
};

//get all items
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.session.user?.id);
  if (user == null) {
    res.json(taskList);
  } else {
    res.json(user.taskList);
  }
});

//put item
router.post(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.session.user?.id);
      const { text } = req.body;

      if (user != null) {
        user.taskList.items.push({
          id: ++user.taskList.lastItemID,
          text: text,
          checked: false,
        });

        await user.save();
        res.json({ id: user.taskList.lastItemID });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Сталася помилка при додаванні завдання." });
    }
  }
);

//change item
router.put(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.session.user?.id);
      const { text, id, checked } = req.body;

      if (user != null) {
        const task = user.taskList.items.find((item) => item.id === id);
        if (task != undefined) {
          task.text = text;
          task.checked = checked;
        }
        await user.save();

        res.json({ ok: true });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Сталася помилка при оновленні завдання." });
    }
  }
);

//delete item
router.delete(
  "/",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.session.user?.id);
      const { id } = req.body;

      if (user != null) {
        const taskIndex = user.taskList.items.findIndex(
          (item) => item.id === Number(id)
        );
        if (taskIndex === -1) {
          res.status(404).json({ message: "Завдання не знайдено." });
        } else {
          user.taskList.items.splice(taskIndex, 1);
          await user.save();

          res.json({ ok: true });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Сталася помилка при видаленні завдання." });
    }
  }
);

export default router;
