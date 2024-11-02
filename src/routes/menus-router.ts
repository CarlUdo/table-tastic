import express from "express";
import {
  addMenu,
  getAllMenus,
  getMenu,
  updateMenu,
} from "../controllers/menus-controller";

export const createMenusRouter = () => {
  const router = express.Router();

  router.get("/", getAllMenus);
  router.get("/:id", getMenu);
  router.post("/", addMenu);
  router.patch("/:id", updateMenu);

  return router;
};
