import { Request, Response, NextFunction } from "express";
import mapper from "../helpers/mapper.helper";
import { UserCreateDto } from "../dtos/user-create";
import { UserService } from "../services/user.service";
import { PokemonService } from "../services/pokemon.service";

export class UserController {
  private userService = new UserService();
  private pokemonService = new PokemonService();

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const authDtoData: UserCreateDto = mapper(req.body, UserCreateDto);
      console.log("record: ", authDtoData);
      const record = await this.userService.add(authDtoData);
      res.send(record);
    } catch (error) {
      console.log("este ERROROR");
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await this.userService.getAll();
      res.send(records);
    } catch (err) {
      console.log("este ERROROR");
    }
  }

  async setFavoritePokemon(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("data user: ", (req as any).user);
      const userReq = (req as any).user;
      console.log("data userReq: ", userReq.id);
      const { pokemonId } = req.body;

      await this.userService.setFavoritePokemon(userReq.id, pokemonId);
      res.json({
        message: "Pokémon agregado a la lista de favoritos",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al agregar el Pokémon a la lista de favoritos",
        success: false,
      });
    }
  }

  async getFavoritesPokemon(req: Request, res: Response, next: NextFunction) {
    try {
      const userReq = (req as any).user;
      console.log("data userReq: ", userReq.id);

      const user = await this.userService.findOneById(userReq.id);
      let records: any[] = [];

      if (user?.favorites.length) {
        records = await this.pokemonService.listPokemonsData(user.favorites);
      }
      console.log("user favorite:", user);

      res.send(records);
    } catch (err) {
      console.log("este ERROROR");
    }
  }

  async removeFavoritePokemon(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("data user: ", (req as any).user);
      const userReq = (req as any).user;
      console.log("data userReq: ", userReq.id);
      const { pokemonId } = req.body;

      const pokemons = (await this.userService.removeFavoritePokemon(
        userReq.id,
        pokemonId
      )) as number[];

      const favorites = await this.pokemonService.listPokemonsData(pokemons);
      res.send({
        favorites,
        message: "Pokemon eliminado de los favoritos",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al remover el Pokémon de la lista de favoritos",
      });
    }
  }
}
