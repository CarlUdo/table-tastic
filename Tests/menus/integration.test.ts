import { createApp } from '../../src/app';
import request from 'supertest';
import { deepEqual, equal } from 'node:assert/strict';
import test from 'node:test';
import { MENUS_BASE_URL } from '../../src/libs/constants';

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
