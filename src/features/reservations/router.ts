import express from "express";
import { Service } from ".";

export const createRouter = (service: Service) => {
  const router = express.Router();

  router.get("/", async (_req, res) => {
    const menus = await service.getAllReservations();
    res.status(200).json(menus);
  });

  router.get("/:id", async (req, res) => {
    const menu = await service.getReservation(req.params.id);
    res.status(200).json(menu);
  });

  router.patch("/:id", async (req, res) => {
    const menu = await service.updateReservation(req.body, req.params.id);
    res.status(200).json(menu);
  });

  router.post("/", async (req, res) => {
    const menu = await service.makeReservation(req.body);
    res.status(201).json(menu);
  });

  router.delete("/:id", async (req, res) => {
    const menu = await service.removeReservation(req.params.id);
    res.status(200).json(menu);
  });

  return router;
};
