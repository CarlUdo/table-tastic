import express from "express";
import {
  getAllReservations,
  getReservation,
  makeReservation,
} from "../controllers/reservations-controller";

export const createReservationsRouter = () => {
  const router = express.Router();

  router.get("/", getAllReservations);
  router.get("/:id", getReservation);
  router.post("/", makeReservation);

  return router;
};
