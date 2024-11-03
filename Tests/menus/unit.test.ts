import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { menusDb as db } from "../../src/db/menus/menus-db";
import { getAll } from "../../src/services/menus/menus-db-functions";

test("getAll should return all menus", async () => {
  const result = await getAll();
  
  deepEqual(result, db);
});
