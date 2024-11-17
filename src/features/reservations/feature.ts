import { createRouter, createService, type Repository } from ".";

export const createReservationsFeature = (db: Repository) => {
  const reservationsService = createService(db);
  const router = createRouter(reservationsService);

  return {
    router,
  };
};
