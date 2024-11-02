import test from "node:test";
import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import { createApp } from "../src/app";
import {
  INVALID_ID,
  INVALID_MENU,
  MENU_EXISTS,
  MENU_NOT_FOUND,
  MENUS_BASE_URL,
} from "../src/libs/constants";
import type { Menu } from "../src/db/menus/menus-db";

/* Testing menus router */
test("GET /status", async () => {
  const app = createApp();

  const response = await request(app).get("/status");

  equal(response.status, 200);
});

test("GET all menus should return 200 status", async () => {
  const app = createApp();

  const response = await request(app).get(MENUS_BASE_URL);

  equal(response.status, 200);
});

test("GET all menus should return 3 menus", async () => {
  const app = createApp();

  const response = await request(app).get(MENUS_BASE_URL);

  equal(response.body.length, 3);
});

test("GET all menus should include breakfast menu", async () => {
  const app = createApp();

  const breakfastMenu: Menu = {
    id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
    name: "Breakfast Menu",
    dishes: ["Pancakes", "Omelette"],
  };

  const responseBody: Menu[] = (await request(app).get(MENUS_BASE_URL)).body;

  const breakfastMenuExists = responseBody.some(
    (menu) => JSON.stringify(menu) === JSON.stringify(breakfastMenu),
  );

  equal(true, breakfastMenuExists);
});

test("GET menu for id should return 'Menu not found.' when database id doesn't exist", async () => {
  const app = createApp();

  const idNotInDb = "9de3faf7-36f3-4449-b4b5-7c3393f00e19";

  const responseBody = (
    await request(app).get(`${MENUS_BASE_URL}/${idNotInDb}`)
  ).body;

  equal(responseBody.error.message, MENU_NOT_FOUND);
});

test("GET menu id '42995559-2641-4d33-85e9-9043373fc6bf' should return dinner menu", async () => {
  const app = createApp();

  const dinnerMenu: Menu = {
    id: "42995559-2641-4d33-85e9-9043373fc6bf",
    name: "Dinner Menu",
    dishes: ["Steak", "Pasta"],
  };

  const responseBody: Menu[] = (
    await request(app).get(
      `${MENUS_BASE_URL}/42995559-2641-4d33-85e9-9043373fc6bf`,
    )
  ).body;

  deepEqual(responseBody, dinnerMenu);
});

test("GET menu id 1 should return 'Invalid ID format.'", async () => {
  const app = createApp();

  const responseBody = (await request(app).get(`${MENUS_BASE_URL}/1`)).body;

  equal(responseBody.error.message, INVALID_ID);
});

test("POST wrong menu should return 'Invalid menu format.'", async () => {
  const app = createApp();

  const invalidMenu = {
    name: "Invalid Menu",
    dishes: ["Ham", "Carrots"],
  };

  const response = await request(app)
    .post(MENUS_BASE_URL)
    .send(invalidMenu)
    .expect(400);

  equal(response.body.error.message, INVALID_MENU);
});

test("POST if menu exists it should return 'Menu already exists.'", async () => {
  const app = createApp();

  const existingMenu = {
    name: "Breakfast Menu",
    dishes: ["Pancakes", "Omelette"],
  };

  const response = await request(app)
    .post(MENUS_BASE_URL)
    .send(existingMenu)
    .expect(409);

  equal(response.body.error.message, MENU_EXISTS);
});

test("POST valid menu should return the created menu", async () => {
  const app = createApp();

  const validMenu = {
    name: "Breakfast Menu",
    dishes: ["Porridge", "Toast"],
  };

  const response = await request(app)
    .post(MENUS_BASE_URL)
    .send(validMenu)
    .expect(201);

  const responseBody = response.body;

  equal(responseBody.name, validMenu.name);
  equal(responseBody.dishes.length, validMenu.dishes.length);
  responseBody.dishes.forEach((dish: string, index: number) => {
    equal(dish, validMenu.dishes[index]);
  });
});

test("PATCH wrong menu should return 'Invalid menu format.'", async () => {
  const app = createApp();

  const invalidMenu = {
    name: "Invalid Menu",
    dishes: ["Meatballs", "Icecream"],
  };

  const response = await request(app)
    .patch(`${MENUS_BASE_URL}/9de3faf7-36f3-4449-b4b5-7c3393f00e10`)
    .send(invalidMenu)
    .expect(400);

  equal(response.body.error.message, INVALID_MENU);
});

/* Testing reservations router */
