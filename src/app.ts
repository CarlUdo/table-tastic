import express, { Request, Response } from "express";

export const createApp = () => {
  const app = express();
  
  app.use(express.json());

  app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  return app;
};
