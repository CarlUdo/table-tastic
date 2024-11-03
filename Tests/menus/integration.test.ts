import { createApp } from '../../src/app';
import request from 'supertest';
import { deepEqual, equal } from 'node:assert/strict';
import test from 'node:test';
import { MENUS_BASE_URL } from '../../src/libs/constants';
import type { Menu } from '../../src/db/menus/menus-db';
import { menusDb as db } from '../../src/db/menus/menus-db';

test ("GET all menus should return 3 menus", async () => {
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
    dishes: ["Pancakes", "Omelette"]
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
    dishes: ["Avocado Toast", "Beer"]
  };

  const response = await request(app).post(MENUS_BASE_URL).send(newMenu);

  const createdId = response.body.id;

  equal(response.status, 201);

  equal(response.body.name, newMenu.name);
  
  deepEqual(response.body.dishes, newMenu.dishes);

  const createdMenu = await request(app).get(`${MENUS_BASE_URL}${createdId}`);
  
  equal(createdMenu.status, 200);
  
  equal(createdMenu.body.name, newMenu.name);

  deepEqual(createdMenu.body.dishes, newMenu.dishes);
});
