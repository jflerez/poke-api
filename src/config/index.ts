import * as dotenv from "dotenv";
dotenv.config();

export default {
  PORT: +(process.env.PORT as string),
  MONGODB_URL: process.env.MONGODB_URL as string,
  USER: process.env.USER_MONGO,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  BASE_URL_POKE_API: process.env.BASE_URL_POKE_API as string,
};
