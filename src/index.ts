import { createApp } from "./app/app";
import { createMenusFeature } from "./features/menus/feature";
import { createRepository } from "./features/menus/repository";

(() => {
  const PORT = 3000;
  const HOST = "0.0.0.0";

  const db = createRepository();

  const app = createApp(
    createMenusFeature(db).router,
    /* createReservationsFeature(client), */
  );

  app.listen(PORT, HOST, () => {
    console.log(`Server is up an running on http://${HOST}:${PORT}`);
  });
})();
