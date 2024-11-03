/*
  To mirror real-life scenarios where database operations are asynchronous I utilize promises and async/await syntax.
*/

import type { Reservation } from "../../db/reservations/reservations-db";
import { reservationsDb } from "../../db/reservations/reservations-db";
import { FULLY_BOOKED } from "../../libs/constants";

export const getAll = async (): Promise<Reservation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(reservationsDb), 100);
  });
};

export const create = async (
  reservation: Reservation,
): Promise<Reservation> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fullyBooked = reservationsDb.some(
        (dbReservation) =>
          dbReservation.date === reservation.date &&
          dbReservation.time === reservation.time,
      );

      if (fullyBooked) {
        reject(new Error(FULLY_BOOKED));
        return;
      }

      reservationsDb.push(reservation);
      resolve(reservation);
    }, 100);
  });
};
