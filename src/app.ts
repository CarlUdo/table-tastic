import express, { Request, Response } from "express";
import { createMenuesRouter } from "./routes/menues-router";
import { createReservationsRouter } from "./routes/reservations-router";

export const createApp = () => {
  const menuesRouter = createMenuesRouter();
  const reservationsRouter = createReservationsRouter();

  const app = express();

  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use("/api/v1/menues", menuesRouter);

  app.use("/api/v1/reservations", reservationsRouter);

  return app;
};
