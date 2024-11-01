import express, { Request, Response } from "express";

export const createApp = () => {
  const app = express();
  
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json();
  });
};
