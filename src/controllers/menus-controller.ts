import { Request, Response } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../services/menus/menus-db-functions";
import { menuSchema } from "../validation/menu.schema";
import {
  GENERAL_SERVER_ERROR,
  INVALID_ID,
  INVALID_MENU,
  MENU_EXISTS,
  MENU_NOT_FOUND,
} from "../libs/constants";
import { v4 as uuidv4 } from "uuid";
import { idSchema } from "../validation/id.schema";

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
      let statusCode = 500;
      if (error.message === MENU_NOT_FOUND) statusCode = 404;
      
      res.status(statusCode).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const addMenu = async (req: Request, res: Response) => {
  try {
    const menu = req.body;

    const validationResult = menuSchema.safeParse(menu);

    if (!validationResult.success) {
      res.status(400).json({ error: { message: INVALID_MENU } });
      return;
    }

    const id = uuidv4();

    const newMenu = {
      id,
      ...validationResult.data,
    };

    await create(newMenu);

    res.status(201).json(newMenu);
  } catch (error) {
    if (error instanceof Error) {
      let statusCode = 500;
      if (error.message === MENU_EXISTS) statusCode = 409;
      res.status(statusCode).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const menu = req.body;

    const idValidationResult = idSchema.safeParse(id);

    const menuValidationResult = menuSchema.safeParse(menu);

    if (!idValidationResult.success) {
      res.status(400).json({ error: { message: INVALID_ID } });
      return;
    }

    if (!menuValidationResult.success) {
      res.status(400).json({ error: { message: INVALID_MENU } });
      return;
    }

    const menuToUpdate = {
      id: idValidationResult.data,
      ...menuValidationResult.data,
    };

    const updatedMenu = await update(menuToUpdate);

    if (typeof updatedMenu === "string") {
      res.status(204).json();
      return;
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    if (error instanceof Error) {
      let statusCode = 500;
      if (error.message === MENU_NOT_FOUND) statusCode = 404;
      
      res.status(statusCode).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validationResult = idSchema.safeParse(id);

    if (!validationResult.success) {
      res.status(400).json({ error: { message: INVALID_ID } });
      return;
    }

    const menu = await remove(validationResult.data);

    res
      .status(200)
      .json( menu );
  } catch (error) {
    if (error instanceof Error) {
      let statusCode = 500;
      if (error.message === MENU_NOT_FOUND) statusCode = 404;
      
      res.status(statusCode).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};
