import express from "express";
import { ApplicationServer } from "./server/ApplicationServer";


(async () => {
  const expressApp = express();
  const app = new ApplicationServer({
    express: expressApp,
    properties: {
      SERVER_PORT: 8000
    }
  });
  await app.start();
})()
  .then(() => console.log("server started"))
  .catch((err) => console.error(err));