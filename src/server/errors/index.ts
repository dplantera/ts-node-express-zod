interface HttpError {
  name: BadRequestError["name"];
  statusCode : BadRequestError["statusCode"]
}

export class BadRequestError extends Error implements HttpError{
  public name = "BAD_REQUEST";
  public readonly statusCode: number = 400;
  constructor(msg:string) {
    super(msg);
  }
}

export class ResponseValidationError extends Error implements HttpError{
  public name = "INVALID_RESPONSE";
  public readonly statusCode: number = 500;
  constructor(msg:string) {
    super(msg);
  }
}
