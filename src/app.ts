import express from "express";
import cors from "cors";

import { route as routeUser } from "./routes/user.route";
import { route as routeAuth } from "./routes/auth.route";
import { route as routePokemon } from "./routes/pokemon.route";


const app = express();

//! Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", routeUser);
app.use("/api/auth", routeAuth);
app.use("/api/pokemon", routePokemon);

export default app;
