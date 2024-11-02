import { Request, Response } from "express";
import { getAll, getById } from "../services/menus/menus-db-functions";
import { idSchema } from "../validation";
import { GENERAL_SERVER_ERROR, INVALID_ID } from "../libs/constants";

export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const menus = await getAll();

    res.status(200).json(menus);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validationResult = idSchema.safeParse(id);

    if (!validationResult.success) {
      res.status(400).json({ error: { message: INVALID_ID } });
      return;
    }

    const menu = await getById(validationResult.data);

    res.status(200).json(menu);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};
