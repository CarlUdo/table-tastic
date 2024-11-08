import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors";
export function createErrorRequestHandler() {
  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
      return;
    }

    if (err instanceof AppError) {
      if (err.statusMessage() === "NOT_FOUND_ERROR") {
        res.status(404).json(err.message);
        return;
      }
      if (err.statusMessage() === "BAD_REQUEST_ERROR") {
        res.status(500).json(err.message);
        return;
      }
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  return errorHandler;
}
