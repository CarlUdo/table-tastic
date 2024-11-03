import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import test from "node:test";
import { createApp } from "../../src/app";
import { RESERVATIONS_BASE_URL } from "../../src/libs/constants";
import { reservationsDb as db } from "../../src/db/reservations/reservations-db";

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

  const response = await request(app).get(`${RESERVATIONS_BASE_URL}/${validId}`);

  const expectedReservation = db.find(res => res.id === validId);

  equal(response.status, 200);
  deepEqual(response.body, expectedReservation);
});
