import { Request, Response, NextFunction } from "express";

import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  private pokemonService = new PokemonService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await this.pokemonService.getAll();
      res.send(records);
    } catch (err) {
      console.log("error to get all pokemons: ", err);
    }
  }

  async getTest(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await this.pokemonService.getTest();
      res.send(records);
    } catch (err) {
      console.log("error to get getTest: ", err);
    }
  }
}
