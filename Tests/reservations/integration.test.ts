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
