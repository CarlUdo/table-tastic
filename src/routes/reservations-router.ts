import express from "express";
import {
  getAllReservations,
  makeReservation,
} from "../controllers/reservations-controller";

export const createReservationsRouter = () => {
  const router = express.Router();

  router.get("/", getAllReservations);
  router.post("/", makeReservation);

  return router;
};
