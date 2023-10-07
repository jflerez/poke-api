import express from "express";
import { PokemonController } from "../controllers/pokemon.controller";

const controller = new PokemonController();
const route = express.Router();
route.get("", controller.getAll.bind(controller));
route.get("/apigateway", controller.getTest.bind(controller));

export { route };
