import express from "express";
import { reservationsDb as db } from "../db/reservations/reservations";

export const createReservationsRouter = (db) => {
  return {
    getRouter: () => {
      const router = express.Router();

      return router;
    },
  };
};
