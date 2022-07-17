import { NextFunction, Request, Response } from "express";
import zod from "zod";
import { BadRequestError } from "../errors";

export type ValidatedRequest<T> = Request & { body: T }
export type ResultResponse<T> = Response & { result?: T }

export const Validate = {
  request: function <T extends zod.Schema>(schema: T) {
    return (req: ValidatedRequest<zod.TypeOf<T>>, res: Response, next: NextFunction) => {
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        next(new BadRequestError(JSON.stringify(validationResult.error.issues)));
        return;
      }
      req.body = validationResult.data;
      next();
    };
  },
  response: function <T extends zod.Schema>(schema: T) {
    return (req: ValidatedRequest<zod.TypeOf<T>>, res: ResultResponse<zod.TypeOf<T>>, next: NextFunction) => {
      const validationResult = schema.safeParse(res.result);
      if (!validationResult.success) {
        next(new BadRequestError(JSON.stringify(validationResult.error.issues)));
      }
      res.json(validationResult);
    };
  }
};