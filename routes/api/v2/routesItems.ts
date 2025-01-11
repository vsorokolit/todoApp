import { Router, Request, Response, NextFunction } from "express";
import User from "../../../models/User";

let taskList = {
  items: [
    { id: 1, text: "залогінься", checked: false },
    { id: 2, text: "залогінься", checked: false },
    { id: 3, text: "залогінься", checked: false },
  ],
};

const getItems = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.user?.id);
  if (user) {
    res.json(user.taskList);
  } else {
    res.json(taskList);
  }
};

const addItem = async (req: Request, res: Response) => {
  try {
    const user = await getUserOrNull(req, res);
    if (!user) return;
    const { text } = req.body;

    user.taskList.items.push({
      id: ++user.taskList.lastItemID,
      text: text,
      checked: false,
    });

    await user.save();
    res.json({ id: user.taskList.lastItemID });
  } catch (error) {
    res.status(500).json({ message: "Сталася помилка при додаванні завдання." });
  }
};

const editItem = async (req: Request, res: Response) => {
  try {
    const user = await getUserOrNull(req, res);
    if (!user) return;
    const { text, id, checked } = req.body;
    const task = user.taskList.items.find((item) => item.id === id);

    if (task != undefined) {
      task.text = text;
      task.checked = checked;
    }
    await user.save();

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Сталася помилка при оновленні завдання." });
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const user = await getUserOrNull(req, res);
    if (!user) return;
    const { id } = req.body;

    const taskIndex = user.taskList.items.findIndex((item) => item.id === Number(id));
    if (taskIndex === -1) {
      res.status(500).json({ message: "Завдання не знайдено." });
      return;
    }

    user.taskList.items.splice(taskIndex, 1);
    await user.save();

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Сталася помилка при видаленні завдання." });
  }
};

const getUserOrNull = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.user?.id);
  if (user == null) {
    res.status(500).json({ message: "Сталася помилка при виконанні операції." });
    return null;
  }
  return user;
};

export { getItems, addItem, editItem, deleteItem };
