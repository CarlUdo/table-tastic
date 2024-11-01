import express, { Request, Response } from "express";
import { createMenuesRouter } from "./routes/menues-router";
import { createReservationsRouter } from "./routes/reservations-router";
import { menuesDb } from "./db/menues/menues-db";
import { reservationsDb } from "./db/reservations/reservations";

export const createApp = () => {
  const menuesRouter = createMenuesRouter(menuesDb).getRouter();
  const reservationsRouter =
    createReservationsRouter(reservationsDb).getRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use("/api/v1/menues", menuesRouter);

  app.use("/api/vi/reservations", reservationsRouter);

  return app;
};
