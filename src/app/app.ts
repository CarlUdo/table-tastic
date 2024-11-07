import express, { Request, Response, Router } from "express";
import { MENUS_BASE_URL, RESERVATIONS_BASE_URL } from "../libs";
import { logger } from "../middleware/logger";

export const createApp = (
  menusRouter: Router /* , reservationsRouter: Router */,
) => {
  const app = express();

  app.use(express.json());

  if (process.env.NODE_ENV !== "test") {
    app.use(logger);
  }

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" }); //onödigt med message
  });

  app.use(MENUS_BASE_URL, menusRouter);

  //app.use(RESERVATIONS_BASE_URL, reservationsRouter);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
};
