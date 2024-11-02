import express, { Request, Response } from "express";
import { createMenusRouter } from "./routes/menus-router";
import { createReservationsRouter } from "./routes/reservations-router";

export const createApp = () => {
  const menusRouter = createMenusRouter();
  const reservationsRouter = createReservationsRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use("/api/v1/menus", menusRouter);

  app.use("/api/v1/reservations", reservationsRouter);

  return app;
};
