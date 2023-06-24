import { Request, Response, NextFunction } from "express";

import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  private pokemonService = new PokemonService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await this.pokemonService.getAll();
      res.send(records);
    } catch (err) {
      console.log("este ERROROR");
    }
  }
}
