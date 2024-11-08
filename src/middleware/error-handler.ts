import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { BadRequestError, NotFoundError } from "../errors";

export const createErrorRequestHandler = (): ErrorRequestHandler => {
  return (err, _req, res, _next) => {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
      return;
    }

    if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }

    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }

    res.status(500).json({ error: "Internal server error" });
  };
};
