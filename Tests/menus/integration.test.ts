import { createApp } from '../../src/app';
import request from 'supertest';
import { equal } from 'assert';
import test from 'node:test';
import { MENUS_BASE_URL } from '../../src/libs/constants';

test ("GET all menus should return 3 menus", async () => {
  const app = createApp();

  const response = await request(app).get(MENUS_BASE_URL);
  
  const responseBody = response.body;

  equal(response.status, 200);
  
  equal(responseBody.length, 3);
});
