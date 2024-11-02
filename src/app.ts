import express, { Request, Response } from "express";
import { createMenusRouter } from "./routes/menus-router";
import { createReservationsRouter } from "./routes/reservations-router";
import { MENUS_BASE_URL } from "./libs/constants";

export const createApp = () => {
  const menusRouter = createMenusRouter();
  const reservationsRouter = createReservationsRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use(MENUS_BASE_URL, menusRouter);

  app.use("/api/v1/reservations", reservationsRouter);

  return app;
};
