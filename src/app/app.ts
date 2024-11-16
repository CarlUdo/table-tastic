import express, { Request, Response, Router } from "express";
import { logger } from "../middleware/logger";
import { createErrorRequestHandler } from "../middleware/error-handler";

export const createApp = (menusRouter: Router, reservationsRouter: Router) => {
  const app = express();

  app.use(express.json());

  if (process.env.NODE_ENV !== "test") {
    app.use(logger);
  }

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json(); 
  });

  app.use("/api/v1/menus", menusRouter);

  app.use("/api/v1/reservations", reservationsRouter);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(createErrorRequestHandler());

  return app;
};
