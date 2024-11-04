import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { rejects } from "node:assert";
import { Menu, menusDb as db } from "../../src/db/menus";
import { createMenusDb } from "../../src/services/menus";
import { MENU_EXISTS, MENU_NOT_FOUND } from "../../src/libs";

test("getAll should return all menus", async () => {
  const result = await createMenusDb.getAll();

  deepEqual(result, db);
});

test("getById should return the correct menu by id", async () => {
  const validId = "9de3faf7-36f3-4449-b4b5-7c3393f00e10";

  const result = await createMenusDb.getById(validId);

  deepEqual(
    result,
    db.find((menu) => menu.id === validId),
  );
});

test("getById should reject if menu not found", async () => {
  const invalidId = "invalid-id";

  await rejects(async () => {
    await createMenusDb.getById(invalidId);
  }, new Error(MENU_NOT_FOUND));
});

test("create should reject if menu exists", async () => {
  const validId = "42995559-2641-4d33-85e9-9043373fc6bf";

  const newMenu: Menu = {
    id: validId,
    name: "Dinner Menu",
    dishes: ["Chicken wings"],
  };

  await rejects(async () => {
    await createMenusDb.create(newMenu);
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
    dishes: ["Chicken wings"],
  };

  const result = await createMenusDb.create(newMenu);

  deepEqual(result, newMenu);

  const createdMenu = await createMenusDb.getById(newMenu.id);

  deepEqual(createdMenu, newMenu);
});

test("update should modify an existing menu", async () => {
  const updatedMenu: Menu = {
    id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
    name: "Breakfast Menu",
    dishes: ["Nutella pancakes", "Strawberry milkshake"],
  };

  const result = await createMenusDb.update(updatedMenu);

  deepEqual(result, updatedMenu);
});

test("update should reject if menu not found", async () => {
  const invalidId = "9de3faf7-36f3-4449-b4b5-7c3393f00e17";

  const nonExistingMenu: Menu = {
    id: invalidId,
    name: "Breakfast Menu",
    dishes: ["Ham sandwich"],
  };

  rejects(async () => {
    await createMenusDb.update(nonExistingMenu);
  }, new Error(MENU_NOT_FOUND));
});

test("remove should delete a menu by id", async () => {
  const validId = "9de3faf7-36f3-4449-b4b5-7c3393f00e10";

  const result = await createMenusDb.remove(validId);

  deepEqual(result.id, validId);

  rejects(async () => {
    await createMenusDb.getById(validId);
  }, new Error(MENU_NOT_FOUND));
});

test("remove should reject if menu not found", async () => {
  const invalidId = "9de3faf7-36f3-4449-b4b5-7c3393f09e10";

  rejects(async () => {
    await createMenusDb.remove(invalidId);
  }, new Error(MENU_NOT_FOUND));
});
