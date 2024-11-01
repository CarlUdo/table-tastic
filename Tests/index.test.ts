import test from "node:test";
import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import { createApp } from "../src/app";

test("GET /status", async () => {
  const app = createApp();

  const response = await request(app).get("/status");

  equal(response.status, 200);
});
