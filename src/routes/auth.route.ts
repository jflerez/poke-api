import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { requestValidate } from "../middlewares/request.validate";
import { UserCreateDto } from "../dtos/user-create";
import { UserLoginDto } from "../dtos/user-login";

const controller = new AuthController();
const route = express.Router();
route.post(
  "/register",
  requestValidate(UserCreateDto),
  controller.add.bind(controller)
);

route.post(
  "/login",
  requestValidate(UserLoginDto),
  controller.login.bind(controller)
);

export { route };
