import test from "node:test";
import { deepEqual } from "node:assert/strict";
import { create, getAll, getById } from "../../src/services/reservations/reservations-db-functions";
import { reservationsDb as db, Reservation } from "../../src/db/reservations/reservations-db";
import { rejects } from "node:assert";
import { FULLY_BOOKED, RESERVATION_NOT_FOUND } from "../../src/libs/constants";

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
    await create (newReservation);
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

  const result = await create(newReservation);
  
  deepEqual(result, newReservation);

  const createdReservation = await getById(newReservation.id);
  
  deepEqual(createdReservation, newReservation);
});

