/*
  To mirror real-life scenarios where database operations are asynchronous I utilize promises and async/await syntax.
*/ 

import { menuesDb } from "../../db/menues/menues-db";

export const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(menuesDb), 100);
  });
};
