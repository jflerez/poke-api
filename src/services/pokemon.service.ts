import { HttpClient } from "../client/http-client";
import config from "../config";
import { PokemonData } from "../interfaces/pokemon-data";
import { Pokemons } from "../interfaces/pokemons";

export class PokemonService {
  private httpClient = new HttpClient(config.BASE_URL_POKE_API);
  async getAll() {
    try {
      const pokemonsResp = await this.httpClient.get(
        "/pokemon?offset=0&limit=52"
      );

      const pokemons = pokemonsResp as Pokemons;
      const data = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          const urlPokemon = pokemon.url.split(config.BASE_URL_POKE_API);
          const dataPokemon = (await this.httpClient.get(
            urlPokemon[1]
          )) as PokemonData;

          return {
            id: dataPokemon.id,
            name: pokemon.name,
            image: dataPokemon.sprites.front_default,
          };
        })
      );

      return data;
    } catch (error) {
      console.log("error al listar pokemons: ", error);
    }
  }

  async listPokemonsData(pokemonsId: number[]) {
    const data = await Promise.all(
      pokemonsId.map(async (pokemonId) => {
        const dataPokemon = (await this.httpClient.get(
          `/pokemon/${pokemonId}`
        )) as PokemonData;

        return {
          id: dataPokemon.id,
          name: dataPokemon.name,
          image: dataPokemon.sprites.front_default,
        };
      })
    );

    return data;
  }

  async getTest() {
    try {
      console.log("API_KEY: ", config.API_KEY);
      console.log("ACCESS_TOKEN: ", config.ACCESS_TOKEN);
      const data = await this.httpClient.get("/customers/user_info", {
        headers: {
          "x-api-key": config.API_KEY,
          "Access-Token": config.ACCESS_TOKEN,
        },
      });
      return data;
    } catch (error) {
      console.log("error al procesar peticion: ", error);
    }
  }
}
