import { App, Controller } from "../ApplicationServer";
import { Middleware, SchemaValidationMiddleware } from "../middlewares/SchemaValidation.middleware";
import { schemaUsersPost, schemaUsersPostResponse, User, UserResult } from "../api/schemas";


export class UsersController implements Controller {
  register(app: App) {
    app.post("/api/users",
      SchemaValidationMiddleware.create(this.createUser.bind(this), {
        requestSchema: schemaUsersPost,
        responseSchema: schemaUsersPostResponse
      })
    )
  }

  createUser(...params: Parameters<Middleware<User, UserResult>>) {
    const [req, res, next] = params;
    const user = req.body;
    res.result = {
      ...user,
      someField: "will-be-removed",
      id: "new-user-1"
    };
    next()
  }
}