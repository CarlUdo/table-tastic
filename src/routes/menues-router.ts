import express, { Request, Response } from "express";
import { menuesDb as db } from "../db/menues/menues-db";

export const createMenuesRouter = (db) => {
  return {
    getRouter: () => {
      const router = express.Router();
      
      router.get("/", (req: Request, res: Response) => {
        res.status(200).json("Hello from Menues router");
      });

      return router;
    },
  };
};
