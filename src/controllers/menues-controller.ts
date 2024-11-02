import { Request, Response } from "express";
import { getAll, getById } from "../services/menues/menues-db-functions";

export const getAllMenues = async (req: Request, res: Response) => {
  try {
    const menues = await getAll();

    res.status(200).json(menues);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res
      .status(500)
      .json({ error: "Something went wrong when getting all menues." });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const menu = await getById(id);

    res.status(200).json(menu);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res
      .status(500)
      .json({ error: "Something went wrong when getting the menu." });
  }
};
