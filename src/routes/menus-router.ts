import express from "express";
import { getAllMenus, getMenu } from "../controllers/menus-controller";

export const createMenusRouter = () => {
  const router = express.Router();

  router.get("/", getAllMenus);
  router.get("/:id", getMenu);

  return router;
};
