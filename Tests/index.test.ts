import test from "node:test";
import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import { createApp } from "../src/app";
import { menusBaseUrl } from "../src/libs/constants";

test("GET /status", async () => {
  const app = createApp();

  const response = await request(app).get("/status");

  equal(response.status, 200);
});

test("GET all menus returns 200 status", async () => {
  const app = createApp();

  const response = await request(app).get(menusBaseUrl);

  equal(response.status, 200);
});

test("GET all menus returns 3 menus", async () => {
  const app = createApp();

  const response = await request(app).get(menusBaseUrl);

  equal(response.body.length, 3);
});
