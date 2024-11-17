import { createMenusDatabase, createMenusFeature, createMenusRepository } from "../features/menus";
import { createReservationsDatabase, createReservationsFeature, createReservationsRepository } from "../features/reservations";
import { createApp } from "./app";

export const initApp = () => {
  const menusDb = createMenusRepository(createMenusDatabase());
  const menusRouter = createMenusFeature(menusDb).router;

  const reservationsDb = createReservationsRepository(createReservationsDatabase());
  const reservationsRouter = createReservationsFeature(reservationsDb).router;

  return createApp(menusRouter, reservationsRouter);
};
