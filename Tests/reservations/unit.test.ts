import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { rejects } from "node:assert";
import { createReservationsDb } from "../../src/services/reservations";
import { reservationsDb as db, Reservation } from "../../src/db/reservations";

import { FULLY_BOOKED, RESERVATION_NOT_FOUND } from "../../src/libs";

test("getAll should return all reservations", async () => {
  const result = await createReservationsDb.getAll();
  deepEqual(result, db);
});

test("getById should return the correct reservation by id", async () => {
  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const result = await createReservationsDb.getById(validId);

  deepEqual(
    result,
    db.find((reservation) => reservation.id === validId),
  );
});

test("getById should reject if reservation not found", async () => {
  const invalidId = "invalid-id";

  await rejects(async () => {
    await createReservationsDb.getById(invalidId);
  }, new Error(RESERVATION_NOT_FOUND));
});

test("create should reject if reservation is fully booked", async () => {
  const newReservation: Reservation = {
    id: "new-id",
    customerName: "Marilyn vos Savant",
    tableNumber: 1,
    date: "2024-11-23",
    time: "08:00",
    menuId: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
  };

  await rejects(async () => {
    await createReservationsDb.create(newReservation);
  }, new Error(FULLY_BOOKED));
});

test("create should add a new reservation", async () => {
  const newReservation: Reservation = {
    id: "new-id",
    menuId: "new-menu-id",
    customerName: "Forrest Gump",
    tableNumber: 2,
    date: "2024-11-27",
    time: "09:00",
  };

  const result = await createReservationsDb.create(newReservation);

  deepEqual(result, newReservation);

  const createdReservation = await createReservationsDb.getById(
    newReservation.id,
  );

  deepEqual(createdReservation, newReservation);
});

test("update should modify an existing reservation", async () => {
  const updatedReservation: Reservation = {
    id: "f576ecc3-b655-488a-b83d-dfbd0182ba5d",
    menuId: "updated-menu-id",
    customerName: "Harrison Ford",
    tableNumber: 10,
    date: "2024-11-23",
    time: "08:00",
  };

  const result = await createReservationsDb.update(updatedReservation);

  deepEqual(result, updatedReservation);
});

test("update should reject if reservation not found", async () => {
  const invalidId = "non-existent-id";

  const nonExistingReservation: Reservation = {
    id: invalidId,
    menuId: "updated-menu-id",
    customerName: "Dolly Parton",
    tableNumber: 4,
    date: "2024-11-25",
    time: "10:00",
  };

  await rejects(async () => {
    await createReservationsDb.update(nonExistingReservation);
  }, new Error(RESERVATION_NOT_FOUND));
});

test("remove should delete a reservation by id", async () => {
  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const result = await createReservationsDb.remove(validId);

  deepEqual(result.id, validId);

  await rejects(async () => {
    await createReservationsDb.getById(validId);
  }, new Error(RESERVATION_NOT_FOUND));
});

test("remove should reject if reservation not found", async () => {
  const invalidId = "non-existent-id";

  await rejects(async () => {
    await createReservationsDb.remove(invalidId);
  }, new Error(RESERVATION_NOT_FOUND));
});
