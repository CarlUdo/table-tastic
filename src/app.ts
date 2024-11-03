import express, { Request, Response } from "express";
import { createMenusRouter, createReservationsRouter } from "./routes";
import { MENUS_BASE_URL, RESERVATIONS_BASE_URL } from "./libs";

export const createApp = () => {
  const menusRouter = createMenusRouter();
  const reservationsRouter = createReservationsRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use(MENUS_BASE_URL, menusRouter);

  app.use(RESERVATIONS_BASE_URL, reservationsRouter);

  return app;
};
