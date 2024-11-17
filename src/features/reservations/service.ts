import {
  FULLY_BOOKED,
  newReservationSchema,
  RESERVATIONS_WRONG_INPUT,
  ReservationUpdates,
  reservationUpdatesSchema,
  type NewReservation,
} from ".";
import { v4 } from "uuid";
import {
  DuplicateKeyError,
  NotFoundError,
} from "../../libs";
import { Repository } from "./repository";
import { RESERVATION_NOT_FOUND } from ".";

export const createService = (db: Repository) => {
  return {
    getAllReservations: async () => db.getAll(),

    getReservation: async (id: string) => {
      const reservation = await db.getById(id);
      if (!reservation) throw new NotFoundError(RESERVATION_NOT_FOUND);
      return reservation;
    },

    makeReservation: async (rawData: NewReservation) => {
      const reservation = newReservationSchema.parse(rawData);
      const exists = (await db.getAll()).some(
        (dbReservation) => dbReservation.date === reservation.date,
      );
      if (exists) throw new DuplicateKeyError(FULLY_BOOKED);
      return db.create({ id: v4(), ...reservation });
    },

    updateReservation: async (rawData: ReservationUpdates, id: string) => {
      const updates = reservationUpdatesSchema.parse(rawData);
      const reservations = await db.getAll();
      const index = reservations.findIndex((reservation) => reservation.id === id);
      if (index === -1) throw new NotFoundError(RESERVATION_NOT_FOUND);
      return await db.update(updates, index);
    },

    removeReservation: async (id: string) => {
      const index = (await db.getAll()).findIndex((reservation) => reservation.id === id);
      if (index === -1) throw new NotFoundError(RESERVATION_NOT_FOUND);
      return await db.remove(id);
    },
  };
};

export type Service = ReturnType<typeof createService>;
