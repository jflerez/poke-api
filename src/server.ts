import app from "./app";
import { ServerBoostrap } from "./startup/server";
import { DatabaseBootstrap, IDatabaseBootstrap } from "./startup/database";

(async () => {
  const serverBootstrap = new ServerBoostrap(app);
  const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();

  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
  } catch (error) {
    console.log("error in run app: ", error);
  }
})();
