import express, { Request, Response } from "express";
import { reservationsDb as db } from "../db/reservations/reservations";

export const createReservationsRouter = (db) => {
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
