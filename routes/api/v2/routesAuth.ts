import { Router, Request, Response, NextFunction } from "express";
import User from "../../../models/User";

const login = async (req: Request, res: Response) => {
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
};

const logout = (req: Request, res: Response) => {
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
};

const register = async (req: Request, res: Response) => {
  const login = req.body.login,
    password = req.body.pass;

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
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export { login, logout, register };
