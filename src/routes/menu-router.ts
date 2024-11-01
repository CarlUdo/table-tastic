import { menuesDb as db } from "../db/menues/menues-db";
import express from "express";

export const createMenuRouter = (db) => {
  return {
    getRouter: () => {
      const router = express.Router();
      
      return router;
    }
  };
};
