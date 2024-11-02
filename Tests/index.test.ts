import test from "node:test";
import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import { createApp } from "../src/app";
import { menusBaseUrl } from "../src/libs/constants";
import type { Menu } from "../src/db/menus/menus-db";

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

test("GET all menus includes breakfast menu", async () => {
  const app = createApp();

  const breakfastMenu: Menu = {
    id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
    name: "Breakfast Menu",
    dishes: ["Pancakes", "Omelette"],
  };

  const responseBody: Menu[] = (await request(app).get(menusBaseUrl)).body;

  const breakfastMenuExists = responseBody.some(menu => JSON.stringify(menu) === JSON.stringify(breakfastMenu));

  equal(true, breakfastMenuExists);
});

