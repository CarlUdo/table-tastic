import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { menusDb as db } from "../../src/db/menus/menus-db";
import { getAll, getById } from "../../src/services/menus/menus-db-functions";
import { MENU_NOT_FOUND } from "../../src/libs/constants";
import { rejects } from "node:assert";

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
