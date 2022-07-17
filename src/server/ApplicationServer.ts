import express, { Application } from "express";
import { UsersController } from "./controller/UsersController";

type ServerConfig = {
  express: Application;
  properties: {
    SERVER_PORT: number
  };
}
export type App = Application;

export interface Controller {
  register(app: App): void;
}

abstract class Server {
  protected constructor(protected readonly config: ServerConfig) {
    this.config.express.use(express.json())
  }
  protected addController(controller:Controller){
    controller.register(this.config.express);
    return this;
  }
}

export class ApplicationServer extends Server{
  constructor(protected readonly config: ServerConfig) {
    super(config);
  }

  public async start() {
    this.addController(new UsersController())
    this.config.express.listen(this.config.properties.SERVER_PORT, () => {
      console.log(`Server is listening on port ${this.config.properties.SERVER_PORT}`);
    });
  }
}