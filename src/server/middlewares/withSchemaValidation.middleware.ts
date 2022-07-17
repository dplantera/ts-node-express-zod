import zod from "zod";
import express, { Request, Response } from "express";
import { Validate } from "./zod-express-validation.middleware";


export const WithSchemaValidation = {
    middleware(controller: express.Handler, params: {
      requestSchema: zod.Schema, responseSchema?: zod.Schema;
    }) {
      const handlers: Array<express.Handler> = [Validate.request(params.requestSchema), controller];
      if (params.responseSchema) {
        handlers.push(Validate.response(params.responseSchema));
      }
      return handlers;
    }
  }
;