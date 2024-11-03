import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import test from "node:test";
import { createApp } from "../../src/app";
import {
  FULLY_BOOKED,
  RESERVATION_NOT_FOUND,
  RESERVATIONS_BASE_URL,
} from "../../src/libs";
import { reservationsDb as db } from "../../src/db/reservations";

test("GET all reservations should return all reservations", async () => {
  const app = createApp();

  const response = await request(app).get(RESERVATIONS_BASE_URL);

  const responseBody = response.body;

  equal(response.status, 200);

  deepEqual(responseBody, db);
});

test("GET reservation by id should return the correct reservation", async () => {
  const app = createApp();

  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const response = await request(app).get(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  const expectedReservation = db.find((res) => res.id === validId);

  equal(response.status, 200);
  deepEqual(response.body, expectedReservation);
});

test("POST a new reservation should create and return the reservation", async () => {
  const app = createApp();

  const newReservation = {
    customerName: "Superman",
    tableNumber: 2,
    date: "2024-11-24",
    time: "09:00",
  };

  const response = await request(app)
    .post(RESERVATIONS_BASE_URL)
    .send(newReservation);

  equal(response.status, 201);

  const createdId = response.body.id;

  equal(response.body.customerName, newReservation.customerName);
  equal(response.body.tableNumber, newReservation.tableNumber);

  const getResponse = await request(app).get(
    `${RESERVATIONS_BASE_URL}/${createdId}`,
  );

  equal(getResponse.status, 200);
  equal(getResponse.body.customerName, newReservation.customerName);
});

test("POST a new reservation should reject if fully booked", async () => {
  const app = createApp();

  const newReservation = {
    customerName: "Dalai Lama",
    tableNumber: 1,
    date: "2024-11-23",
    time: "08:00",
  };

  const response = await request(app)
    .post(RESERVATIONS_BASE_URL)
    .send(newReservation);

  equal(response.status, 409);
  equal(response.body.error.message, FULLY_BOOKED);
});

test("PUT should update an existing reservation and return the updated reservation", async () => {
  const app = createApp();

  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const updatedReservation = {
    customerName: "Updated Name",
    tableNumber: 10,
    date: "2024-11-23",
    time: "08:00",
  };

  const response = await request(app)
    .put(`${RESERVATIONS_BASE_URL}/${validId}`)
    .send(updatedReservation);

  equal(response.status, 200);
  equal(response.body.customerName, updatedReservation.customerName);
  equal(response.body.tableNumber, updatedReservation.tableNumber);
});

test("DELETE a reservation should remove the reservation and return it", async () => {
  const app = createApp();

  const validId = "f576ecc3-b655-488a-b83d-dfbd0182ba5d";

  const expectedReservation = db.find((res) => res.id === validId);

  const response = await request(app).delete(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  equal(response.status, 200);
  deepEqual(response.body, expectedReservation);

  const getResponse = await request(app).get(
    `${RESERVATIONS_BASE_URL}/${validId}`,
  );

  equal(getResponse.status, 404);
});

test("DELETE a reservation should return 404 if reservation not found", async () => {
  const app = createApp();

  const invaliId = "f576ecc3-b655-488a-b83d-dfbd0182ba2d";

  const response = await request(app).delete(
    `${RESERVATIONS_BASE_URL}/${invaliId}`,
  );

  equal(response.status, 404);
  equal(response.body.error.message, RESERVATION_NOT_FOUND);
});
