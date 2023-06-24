import express from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/validate.token";

const controller = new UserController();
const route = express.Router();
route.get("", verifyToken, controller.getAll.bind(controller));
route.post(
  "/favorites",
  verifyToken,
  controller.setFavoritePokemon.bind(controller)
);

route.get(
  "/favorites",
  verifyToken,
  controller.getFavoritesPokemon.bind(controller)
);

route.delete(
  "/favorites",
  verifyToken,
  controller.removeFavoritePokemon.bind(controller)
);

export { route };
