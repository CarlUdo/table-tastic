import test, { beforeEach } from "node:test";
import { deepEqual } from "node:assert/strict";
import { menusDb as db } from "../../src/db/menus/menus-db";
import { create, getAll, getById } from "../../src/services/menus/menus-db-functions";
import { MENU_EXISTS, MENU_NOT_FOUND } from "../../src/libs/constants";
import { rejects } from "node:assert";
import type { Menu } from "../../src/db/menus/menus-db";

test("getAll should return all menus", async () => {
  const result = await getAll();
  
  deepEqual(result, db);
});

test("getById should return the correct menu by id", async () => {
  const menuId = "9de3faf7-36f3-4449-b4b5-7c3393f00e10";

  const result = await getById(menuId);
  
  deepEqual(result, db.find(menu => menu.id === menuId));
});

test("getById should throw error if menu not found", async () => {
  const invalidId = "invalid-id";

  await rejects(async () => {
    await getById(invalidId);
  }, new Error(MENU_NOT_FOUND));
});

test("create should throw error if menu exists", async () => {
  const id = "42995559-2641-4d33-85e9-9043373fc6bf";

  const newMenu: Menu = { 
    id, 
    name: "Dinner Menu", 
    dishes: ["Chicken wings"] 
  };

  await rejects(async () => {
    await create(newMenu);
  }, new Error(MENU_EXISTS));
});

test("create should add a new menu", async () => {
  const initialMenus: Menu[] = [
    {
      id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
      name: "Breakfast Menu",
      dishes: ["Pancakes", "Omelette"],
    },
    {
      id: "fd9c2bf1-8540-4ed9-9be7-155877262259",
      name: "Lunch Menu",
      dishes: ["Burger", "Salad"],
    },
  ];

  db.length = 0;
  db.push(...initialMenus);

  const newMenu: Menu = { 
    id: "7f3f588d-6df3-4f05-be73-be3abf815822", 
    name: "Dinner Menu", 
    dishes: ["Chicken wings"] 
  };

  const result = await create(newMenu);

  deepEqual(result, newMenu);

  const createdMenu = await getById(newMenu.id);
  
  deepEqual(createdMenu, newMenu);
});
