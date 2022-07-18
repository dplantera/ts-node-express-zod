import zod from "zod";
import express, { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors";

export type ValidatedRequest<T> = Request & { body: T }
export type ResultResponse<T> = Response & { result?: T }

export type Middleware<TRequest, TResponse = TRequest> =  express.Handler & ( (
  req: ValidatedRequest<TRequest>,
  res: ResultResponse<TResponse>,
  next: NextFunction
) => void)


export const SchemaValidationMiddleware = {
    create(controller: express.Handler, params: {
      requestSchema: zod.Schema, responseSchema?: zod.Schema;
    }) {
      const handlers: Array<express.Handler> = [
        makeRequestValidator(params.requestSchema),
        controller
      ];
      if (params.responseSchema) {
        handlers.push(makeResponseValidator(params.responseSchema));
      }
      return handlers;
    }
  }
;

function makeRequestValidator<T extends zod.Schema>(schema: T): Middleware<T> {
  return (req: ValidatedRequest<zod.TypeOf<T>>, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      next(new BadRequestError(JSON.stringify(validationResult.error.issues)));
      return;
    }
    req.body = validationResult.data;
    next();
  };
}

function makeResponseValidator<T extends zod.Schema>(schema: T): Middleware<T> {
  return (req: ValidatedRequest<zod.TypeOf<T>>, res: ResultResponse<zod.TypeOf<T>>, next: NextFunction) => {
    const validationResult = schema.safeParse(res.result);
    if (!validationResult.success) {
      next(new BadRequestError(JSON.stringify(validationResult.error.issues)));
      return;
    }
    res.json(validationResult.data);
  };
}