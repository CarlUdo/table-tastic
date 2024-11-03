import { Request, Response } from "express";
import { reservationSchema } from "../validation/reservations.schema";
import { FULLY_BOOKED, GENERAL_SERVER_ERROR, INVALID_RESERVATION, NO_MENU } from "../libs/constants";
import { v4 as uuidv4 } from "uuid";
import { getMenuId } from "../services/menus/menus-db-helper-functions";
import { create } from "../services/reservations/reservations-db-functions";

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
      menuId
    });
    console.log("Reservation: ", newReservation);

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

