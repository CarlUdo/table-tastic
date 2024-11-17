import type { Reservation, ReservationUpdates } from "./validation";

export const createReservationsRepository = (reservationsDb: Reservation[]) => {
  return {
    getAll: async () => reservationsDb,

    getById: async (id: string) => reservationsDb.find((dbReservation) => dbReservation.id === id),

    // create: async (reservation: Reservation) => {
    //   reservationsDb.push(reservation);
    //   return reservation;
    // },

    update: async (updates: ReservationUpdates, index: number) => {
      reservationsDb[index] = { ...reservationsDb[index], ...updates };
      return reservationsDb[index];
    },

    remove: async (id: string) => {
      const removedReservation = reservationsDb.find((dbReservation) => dbReservation.id === id);
      const updatedReservationsDb = reservationsDb.filter((dbReservation) => dbReservation.id !== id);
      reservationsDb.length = 0;
      reservationsDb.push(...updatedReservationsDb);
      return removedReservation ;
    },
  };
};

export type Repository = ReturnType<typeof createReservationsRepository>;
