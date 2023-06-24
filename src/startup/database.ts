import mongoose from "mongoose";
import config from "../config";

export interface IDatabaseBootstrap {
  initialize(): Promise<any>;
}

export class DatabaseBootstrap implements IDatabaseBootstrap {
  async initialize(): Promise<any> {
    try {
      const db = await mongoose.connect(config.MONGODB_URL);
      console.log("Database is connected to: ", db.connection.name);
    } catch (error) {
      console.error(error);
    }
  }
}
