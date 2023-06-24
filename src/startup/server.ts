import { Application } from "express";
import config from "../config";

export interface IServerBoostrap {
  initialize(): Promise<any>;
}

export class ServerBoostrap implements IServerBoostrap {
  constructor(private app: Application) {}
  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(config.PORT)
        .on("listening", () => {
          resolve(true);
          console.log("Server is running on port", config.PORT);
        })
        .on("error", (error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
