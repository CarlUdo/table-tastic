import express from "express";
import {
  deleteReservation,
  getAllReservations,
  getReservation,
  makeReservation,
  updateReservation,
} from "../controllers/reservations-controller";

export const createReservationsRouter = () => {
  const router = express.Router();

  router.get("/", getAllReservations);
  router.get("/:id", getReservation);
  router.post("/", makeReservation);
  router.put("/:id", updateReservation);
  router.delete("/:id", deleteReservation);

  return router;
};
