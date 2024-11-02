import express from "express";
import { getAllMenues } from "../controllers/menues-controller";

export const createMenuesRouter = () => {
  const router = express.Router();

  router.get("/", getAllMenues);

  return router;
};
