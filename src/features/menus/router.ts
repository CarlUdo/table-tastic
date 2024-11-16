import express from "express";
import type { Service } from ".";

export const createRouter = (service: Service) => {
  const router = express.Router();

  router.get("/", async (_req, res) => {
    const menus = await service.getAllMenus();
    res.status(200).json(menus);
  });

  router.get("/:id", async (req, res) => {
    const menu = await service.getMenu(req.params.id);
    res.status(200).json(menu);
  });

  router.patch("/:id", async (req, res) => {
    const menu = await service.updateMenu(req.body, req.params.id);
    res.status(200).json(menu);
  });

  router.post("/", async (req, res) => {
    const menu = await service.addMenu(req.body);
    res.status(201).json(menu);
  });

  router.delete("/:id", async (req, res) => {
    const menu = await service.removeMenu(req.params.id);
    res.status(200).json(menu);
  });
  
  return router;
};
