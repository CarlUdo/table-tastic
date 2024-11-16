import { createApp } from "./app/app";
import { createDatabase, createMenusFeature, createRepository } from "./features/menus";

(() => {
  const PORT = 3000;
  const HOST = "0.0.0.0";

  const db = createRepository(createDatabase());

  const menusRouter = createMenusFeature(db).router;
  const app = createApp(menusRouter);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up an running on http://${HOST}:${PORT}`);
  });
})();
