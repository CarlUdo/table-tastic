import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { getAll } from "../../src/services/reservations/reservations-db-functions";
import { reservationsDb as db } from "../../src/db/reservations/reservations-db";

test("getAll should return all reservations", async () => {
  const result = await getAll();
  deepEqual(result, db);
});
