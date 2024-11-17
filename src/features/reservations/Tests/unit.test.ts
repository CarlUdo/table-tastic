import test from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import assert from "node:assert";
import { createReservationsRepository } from "../repository";
import { createReservationsDatabase } from "../mock-db";
import { createService } from "../service";
import { FULLY_BOOKED, RESERVATION_NOT_FOUND } from "../constants";
import { DuplicateKeyError, NotFoundError } from "../../../libs";
import type { NewReservation, Reservation } from "../validation";

test("Database is empty | getAll should return []", async () => {
  const service = createService(createReservationsRepository([]));

  const result = await service.getAllReservations();

  deepEqual(result, []);
});

test("getAll should return all reservations", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const result = await service.getAllReservations();

  deepEqual(result, db);
});

test("getReservation should return the correct reservation by id", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const result = await service.getReservation(validId);

  deepEqual(
    result,
    db.find((reservation) => reservation.id === validId),
  );
});

test("getReservation should throw NotFoundError if reservation not found", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const invalidId = "invalid-id";

  await assert.rejects(async () => {
    await service.getReservation(invalidId);
  }, new NotFoundError(RESERVATION_NOT_FOUND));
});

test("makeReservation should throw DuplicateKeyError if restaurant is fully booked", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const duplicateReservation: NewReservation = {
    customerName: "Queen Silvia",
    tableNumber: 9,
    date: "2024-11-23",
    time: "08:00",
  };

  await assert.rejects(async () => {
    await service.makeReservation(duplicateReservation);
  }, new DuplicateKeyError(FULLY_BOOKED));
});

test("makeReservation should make new reservation", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const newReservation: NewReservation = {
    customerName: "Elvis",
    tableNumber: 9,
    date: "2024-12-23",
    time: "08:00",
  };

  const result = await service.makeReservation(newReservation);

  equal(result.customerName, newReservation.customerName);
});

test("update should modify an existing reservation", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const validId = "b7f24239-4698-4efc-94e3-18eaa3503677";

  const updatedReservation: Reservation = {
    id: "b7f24239-4698-4efc-94e3-18eaa3503677",
    customerName: "Santa Claus",
    tableNumber: 24,
    date: "2024-12-24",
    time: "21:00",
  };

  const result = await service.updateReservation(updatedReservation, validId);

  deepEqual(result, updatedReservation);
});

test("update should throw NotFoundError if reservation not found", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const invalidId = "b7f24239-4694-4efc-94e3-18eaa3503677";

  const updatedReservation: Reservation = {
    id: "b7f24239-4694-4efc-94e3-18eaa3503677",
    customerName: "Superman",
    tableNumber: 20,
    date: "2024-12-21",
    time: "21:00",
  };

  await assert.rejects(async () => {
    await service.updateReservation(updatedReservation, invalidId);
  }, new NotFoundError(RESERVATION_NOT_FOUND));
});

test("remove should delete a menu by id", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const validId = "b7f24239-4698-4efc-94e3-18eaa3503677";

  const id = (await service.getReservation(validId)).id;

  equal(id, validId);

  await service.removeReservation(validId);

  await assert.rejects(async () => {
    await service.getReservation(validId);
  }, new NotFoundError(RESERVATION_NOT_FOUND));
});

test("remove should throw NotFoundError if reservation not found", async () => {
  const db = createReservationsDatabase();
  const service = createService(createReservationsRepository(db));

  const invalidId = "9de3faf7-36f3-4449-b4b5-7c3393f09e10";

  await assert.rejects(async () => {
    await service.removeReservation(invalidId);
  }, new NotFoundError(RESERVATION_NOT_FOUND));
});

// test("getById should return the correct reservation by id", async () => {
//   const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

//   const result = await createReservationsDb.getById(validId);

//   deepEqual(
//     result,
//     db.find((reservation) => reservation.id === validId),
//   );
// });

// test("getById should reject if reservation not found", async () => {
//   const invalidId = "invalid-id";

//   await rejects(async () => {
//     await createReservationsDb.getById(invalidId);
//   }, new Error(RESERVATION_NOT_FOUND));
// });

// test("create should reject if reservation is fully booked", async () => {
//   const newReservation: Reservation = {
//     id: "new-id",
//     customerName: "Marilyn vos Savant",
//     tableNumber: 1,
//     date: "2024-11-23",
//     time: "08:00",
//     menuId: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
//   };

//   await rejects(async () => {
//     await createReservationsDb.create(newReservation);
//   }, new Error(FULLY_BOOKED));
// });

// test("create should add a new reservation", async () => {
//   const newReservation: Reservation = {
//     id: "new-id",
//     menuId: "new-menu-id",
//     customerName: "Forrest Gump",
//     tableNumber: 2,
//     date: "2024-11-27",
//     time: "09:00",
//   };

//   const result = await createReservationsDb.create(newReservation);

//   deepEqual(result, newReservation);

//   const createdReservation = await createReservationsDb.getById(
//     newReservation.id,
//   );

//   deepEqual(createdReservation, newReservation);
// });

// test("update should modify an existing reservation", async () => {
//   const updatedReservation: Reservation = {
//     id: "f576ecc3-b655-488a-b83d-dfbd0182ba5d",
//     menuId: "updated-menu-id",
//     customerName: "Harrison Ford",
//     tableNumber: 10,
//     date: "2024-11-23",
//     time: "08:00",
//   };

//   const result = await createReservationsDb.update(updatedReservation);

//   deepEqual(result, updatedReservation);
// });

// test("update should reject if reservation not found", async () => {
//   const invalidId = "non-existent-id";

//   const nonExistingReservation: Reservation = {
//     id: invalidId,
//     menuId: "updated-menu-id",
//     customerName: "Dolly Parton",
//     tableNumber: 4,
//     date: "2024-11-25",
//     time: "10:00",
//   };

//   await rejects(async () => {
//     await createReservationsDb.update(nonExistingReservation);
//   }, new Error(RESERVATION_NOT_FOUND));
// });

// test("remove should delete a reservation by id", async () => {
//   const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

//   const result = await createReservationsDb.remove(validId);

//   deepEqual(result.id, validId);

//   await rejects(async () => {
//     await createReservationsDb.getById(validId);
//   }, new Error(RESERVATION_NOT_FOUND));
// });

// test("remove should reject if reservation not found", async () => {
//   const invalidId = "non-existent-id";

//   await rejects(async () => {
//     await createReservationsDb.remove(invalidId);
//   }, new Error(RESERVATION_NOT_FOUND));
// });
