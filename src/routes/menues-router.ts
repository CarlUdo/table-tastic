import express from "express";
import { menuesDb as db } from "../db/menues/menues-db";

export const createMenuesRouter = (db) => {
  return {
    getRouter: () => {
      const router = express.Router();

      return router;
    },
  };
};
