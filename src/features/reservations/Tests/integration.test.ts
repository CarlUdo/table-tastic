import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import test from "node:test";
import { initApp } from "../../../app";
import { NewReservation } from "../validation";

const RESERVATIONS_BASE_URL = "/api/v1/reservations";

test("GET all reservations should return 3 reservations", async () => {
  const app = initApp();

  const response = await request(app).get(RESERVATIONS_BASE_URL);

  const responseBody = response.body;

  equal(response.status, 200);
  equal(responseBody.length, 3);
});

test("GET reservation by id should return the correct reservation", async () => {
  const app = initApp();

  const validId = "f29f33f2-d230-4901-93d8-7145baf409a7";

  const response = await request(app).get(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  const expectedReservation = {
    id: "f29f33f2-d230-4901-93d8-7145baf409a7",
    customerName: "Madonna",
    tableNumber: 6,
    date: "2024-12-10",
    time: "13:00",
  };

  equal(response.status, 200);
  deepEqual(response.body, expectedReservation);
});

test("POST a new reservation should create and return the reservation", async () => {
  const app = initApp();

  const newReservation: NewReservation = {
    customerName: "The Hulk",
    tableNumber: 2,
    date: "2024-11-24",
    time: "19:00",
  };

  const response = await request(app)
    .post(RESERVATIONS_BASE_URL)
    .send(newReservation);

  equal(response.status, 201);

  equal(response.body.customerName, newReservation.customerName);
  deepEqual(response.body.time, newReservation.time);
});

test("PATCH should update an existing reservation and return the updated reservation", async () => {
  const app = initApp();

  const validId = "f29f33f2-d230-4901-93d8-7145baf409a7";

  const updates = {
    date: "2024-12-10",
    time: "15:00",
  };

  const updatedReservation = {
    id: validId,
    customerName: "Madonna",
    tableNumber: 6,
    date: "2024-12-10",
    time: "15:00",
  };

  const response = await request(app)
    .patch(`${RESERVATIONS_BASE_URL}/${validId}`)
    .send(updates);

  equal(response.status, 200);
  deepEqual(response.body, updatedReservation);
});

test("DELETE a reservation should remove the reservation and return it", async () => {
  const app = initApp();

  const validId = "f29f33f2-d230-4901-93d8-7145baf409a7";

  const deletedMenu = {
    id: validId,
    customerName: "Madonna",
    tableNumber: 6,
    date: "2024-12-10",
    time: "13:00",
  };

  const response = await request(app).delete(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  equal(response.status, 200);
  deepEqual(response.body, deletedMenu);

  const getResponse = await request(app).get(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  equal(getResponse.status, 404);
});
