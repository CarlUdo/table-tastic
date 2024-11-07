import { Repository, createService, createRouter } from ".";

export const createMenusFeature = (db: Repository) => {
  const menusService = createService(db);
  const router = createRouter(menusService);

  return {
    router,
  };
};
