/*
  To mirror real-life scenarios where database operations are asynchronous I utilize promises and async/await syntax.
*/

import { menusDb } from "../../db/menus/menus-db";
import type { Menu } from "../../db/menus/menus-db";
import { MENU_EXISTS, MENU_NOT_FOUND } from "../../libs/constants";

export const getAll = async (): Promise<Menu[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(menusDb), 100);
  });
};

export const getById = async (id: string): Promise<Menu> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menu = menusDb.find((dbMenu) => dbMenu.id === id);

      if (!menu) {
        reject(new Error(MENU_NOT_FOUND));
        return;
      }

      resolve(menu);
    }, 100);
  });
};

export const create = async (menu: Menu): Promise<Menu> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = menusDb.some((dbMenu) => dbMenu.name === menu.name);

      if (exists) {
        reject(new Error(MENU_EXISTS));
        return;
      }

      menusDb.push(menu);
      resolve(menu);
    }, 100);
  });
};

export const update = async (menu: Menu): Promise<Menu | ""> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menuToUpdate = menusDb.find((dbMenu) => dbMenu.id === menu.id);

      if (!menuToUpdate) {
        reject(new Error(MENU_NOT_FOUND));
        return;
      }

      resolve(menu);
    }, 100);
  });
};

export const remove = async (id: string): Promise<Menu> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menu = menusDb.find((dbMenu) => dbMenu.id === id);

      if (!menu) {
        reject(new Error(MENU_NOT_FOUND));
        return;
      }

      const updatedMenusDb = menusDb.filter((dbMenu) => dbMenu.id !== id);

      menusDb.length = 0;
      menusDb.push(...updatedMenusDb);

      resolve(menu);
    }, 100);
  });
};
