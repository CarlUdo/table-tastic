import { createApp } from "../../src/app";
import request from "supertest";
import { deepEqual, equal } from "node:assert/strict";
import test from "node:test";
import { MENUS_BASE_URL } from "../../src/libs";
import { Menu, menusDb as db } from "../../src/db/menus";

test("GET all menus should return 3 menus", async () => {
  const app = createApp();

  const response = await request(app).get(MENUS_BASE_URL);

  const responseBody = response.body;

  equal(response.status, 200);
  equal(responseBody.length, 3);
});

test("GET menu by id should return the correct menu", async () => {
  const app = createApp();

  const validId = "9de3faf7-36f3-4449-b4b5-7c3393f00e10";

  const response = await request(app).get(`${MENUS_BASE_URL}/${validId}`);

  const expectedMenu = {
    id: validId,
    name: "Breakfast Menu",
    dishes: ["Pancakes", "Omelette"],
  };

  equal(response.status, 200);
  deepEqual(response.body, expectedMenu);
});

test("POST a new menu should create and return the menu", async () => {
  const app = createApp();

  const initialMenus: Menu[] = [
    {
      id: "fd9c2bf1-8540-4ed9-9be7-155877262259",
      name: "Lunch Menu",
      dishes: ["Burger", "Salad"],
    },
    {
      id: "42995559-2641-4d33-85e9-9043373fc6bf",
      name: "Dinner Menu",
      dishes: ["Steak", "Pasta"],
    },
  ];

  db.length = 0;
  db.push(...initialMenus);

  const newMenu = {
    name: "Breakfast Menu",
    dishes: ["Avocado Toast", "Beer"],
  };

  const response = await request(app).post(MENUS_BASE_URL).send(newMenu);

  equal(response.status, 201);
  equal(response.body.name, newMenu.name);
  deepEqual(response.body.dishes, newMenu.dishes);
});

test("PUT should update an existing menu and return the updated menu", async () => {
  const app = createApp();

  const validId = "fd9c2bf1-8540-4ed9-9be7-155877262259";

  const updatedMenu = {
    id: validId,
    name: "Lunch Menu",
    dishes: ["Burger", "Fries, Coke"],
  };

  const response = await request(app)
    .put(`${MENUS_BASE_URL}/${validId}`)
    .send(updatedMenu);

  equal(response.status, 200);
  deepEqual(response.body, updatedMenu);
});

test("DELETE a menu should remove the menu and return it", async () => {
  const app = createApp();

  const validId = "42995559-2641-4d33-85e9-9043373fc6bf";

  const expectedMenu = {
    id: validId,
    name: "Dinner Menu",
    dishes: ["Steak", "Pasta"],
  };

  const response = await request(app).delete(`${MENUS_BASE_URL}/${validId}`);

  equal(response.status, 200);
  deepEqual(response.body, expectedMenu);

  const getResponse = await request(app).get(`${MENUS_BASE_URL}/${validId}`);

  equal(getResponse.status, 404);
});
