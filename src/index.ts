import { createApp } from "./app/app";
import { createMenusDatabase, createMenusFeature, createMenusRepository } from "./features/menus";
import { createReservationsDatabase, createReservationsFeature, createReservationsRepository } from "./features/reservations";

(() => {
  const PORT = 3000;
  const HOST = "0.0.0.0";

  const menusDb = createMenusRepository(createMenusDatabase());
  const menusRouter = createMenusFeature(menusDb).router;

  const reservationsDb = createReservationsRepository(createReservationsDatabase());
  const reservationsRouter = createReservationsFeature(reservationsDb).router;
  
  const app = createApp(menusRouter, reservationsRouter);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up an running on http://${HOST}:${PORT}`);
  });
})();
