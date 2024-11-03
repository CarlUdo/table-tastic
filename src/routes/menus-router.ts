import express from "express";
import {
  addMenu,
  deleteMenu,
  getAllMenus,
  getMenu,
  updateMenu,
} from "../controllers";

export const createMenusRouter = () => {
  const router = express.Router();

  router.get("/", getAllMenus);
  router.get("/:id", getMenu);
  router.post("/", addMenu);
  router.put("/:id", updateMenu);
  router.delete("/:id", deleteMenu);

  return router;
};
