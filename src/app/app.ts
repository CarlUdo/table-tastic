import express, { Router } from "express";
import { logger, createErrorRequestHandler } from "../middleware";

export const createApp = (menusRouter: Router, reservationsRouter: Router) => {
  const app = express();

  app.use(express.json());

  if (process.env.NODE_ENV !== "test") {
    app.use(logger);
  }

  app.get("/status", (req, res) => {
    res.status(200).json();
  });

  app.use("/api/v1/menus", menusRouter);

  app.use("/api/v1/reservations", reservationsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(createErrorRequestHandler());

  return app;
};
