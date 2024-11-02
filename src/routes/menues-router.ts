import express from "express";
import { getAllMenues, getMenu } from "../controllers/menues-controller";

export const createMenuesRouter = () => {
  const router = express.Router();

  router.get("/", getAllMenues);
  router.get("/:id", getMenu);

  return router;
};
