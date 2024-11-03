import { Request, Response } from "express";
import { reservationSchema } from "../validation/reservations.schema";
import {
  FULLY_BOOKED,
  GENERAL_SERVER_ERROR,
  INVALID_ID,
  INVALID_RESERVATION,
  NO_MENU,
} from "../libs/constants";
import { v4 as uuidv4 } from "uuid";
import { getMenuId } from "../services/menus/menus-db-helper-functions";
import { create, getById, update } from "../services/reservations/reservations-db-functions";
import { getAll } from "../services/reservations/reservations-db-functions";
import { idSchema } from "../validation/id.schema";
import { Reservation } from "../db/reservations/reservations-db";

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await getAll();

    res.status(200).json(reservations);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const getReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validationResult = idSchema.safeParse(id);

    if (!validationResult.success) {
      res.status(400).json({ error: { message: INVALID_ID } });
      return;
    }

    const reservation = await getById(validationResult.data);

    res.status(200).json(reservation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const makeReservation = async (req: Request, res: Response) => {
  try {
    const reservation = req.body;

    const validationResult = reservationSchema.safeParse(reservation);

    if (!validationResult.success) {
      res.status(400).json({ error: { message: INVALID_RESERVATION } });
      return;
    }

    const menuId = await getMenuId(validationResult.data.time);

    if (!menuId) {
      res.status(400).json({ error: { message: NO_MENU } });
      return;
    }

    const reservationId = uuidv4();

    const newReservation = await create({
      ...validationResult.data,
      id: reservationId,
      menuId,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    if (error instanceof Error) {
      let statusCode = 500;
      if (error.message === FULLY_BOOKED) statusCode = 409;
      res.status(statusCode).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = req.body;

    const idValidationResult = idSchema.safeParse(id);

    const reservationValidationResult = reservationSchema.safeParse(reservation);

    if (!idValidationResult.success) {
      res.status(400).json({ error: { message: INVALID_ID } });
      return;
    }

    if (!reservationValidationResult.success) {
      res.status(400).json({ error: { message: INVALID_RESERVATION } });
      return;
    }

    const menuId = await getMenuId(reservationValidationResult.data.time);

    if (!menuId) {
      res.status(400).json({ error: { message: NO_MENU } });
      return;
    }

    const reservationToUpdate: Reservation = {
      id: idValidationResult.data,
      ...reservationValidationResult.data,
      menuId
    };

    const updatedReservation = await update(reservationToUpdate);

    res.status(200).json(updatedReservation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: { message: error.message } });
      return;
    }
    res.status(500).json({ error: { message: GENERAL_SERVER_ERROR } });
  }
};
