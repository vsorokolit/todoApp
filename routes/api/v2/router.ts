import express, { Response, Request } from "express";
import { getItems, addItem, editItem, deleteItem } from "./routesItems";
import { login, logout, register } from "./routesAuth";

const router = express.Router();

router.all("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  const userId = req.session.user?.id;

  if (!userId && action !== "login" && action !== "register" && action !== "getItems" && action !== "logout") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  switch (action) {
    case "getItems":
      getItems(req, res);
      return;
    case "addItem":
      addItem(req, res);
      return;
    case "editItem":
      editItem(req, res);
      return;
    case "deleteItem":
      deleteItem(req, res);
      return;
    case "login":
      login(req, res);
      return;
    case "logout":
      logout(req, res);
      return;
    case "register":
      register(req, res);
      return;
    default:
      res.status(400).json({ error: "Invalid action" });
      return;
  }
});

export default router;
