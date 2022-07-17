import { App, Controller } from "../ApplicationServer";
import { NextFunction, Request, Response } from "express";
import { WithSchemaValidation } from "../middlewares/withSchemaValidation.middleware";
import { ResultResponse, ValidatedRequest } from "../middlewares/zod-express-validation.middleware";
import { schemaUsersPost, schemaUsersPostResponse, User, UserResult } from "../api/schemas";


export class UsersController implements Controller {
  register(app: App) {
    app.post("/api/users",
      WithSchemaValidation.middleware(this.helloWorld.bind(this), {
        requestSchema: schemaUsersPost,
        responseSchema: schemaUsersPostResponse
      })
    )
  }

  helloWorld(req: ValidatedRequest<User>, res: ResultResponse<UserResult>, next: NextFunction) {
    const user = req.body;
    console.log(user)
    user.id = "new-user-1";
    res.result = user;
    next()
  }
}