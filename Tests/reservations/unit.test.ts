import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { getAll, getById } from "../../src/services/reservations/reservations-db-functions";
import { reservationsDb as db } from "../../src/db/reservations/reservations-db";
import { rejects } from "node:assert";
import { RESERVATION_NOT_FOUND } from "../../src/libs/constants";

test("getAll should return all reservations", async () => {
  const result = await getAll();
  deepEqual(result, db);
});

test("getById should return the correct reservation by id", async () => {
  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const result = await getById(validId);
  
  deepEqual(result, db.find((reservation) => reservation.id === validId));
});

test("getById should reject if reservation not found", async () => {
  const invalidId = "invalid-id";

  await rejects(async () => {
    await getById(invalidId);
  }, new Error(RESERVATION_NOT_FOUND));
});
