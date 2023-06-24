import { UserRepository } from "../dal/repositories/user.repository";
import { UserCreateDto } from "../dtos/user-create";
import UserSchema from "../dal/models/user";

export class UserService {
  private repository = new UserRepository(UserSchema);

  async add(user: UserCreateDto) {
    try {
      const userCreate = new UserSchema();
      userCreate.email = user.email;
      userCreate.firstname = user.firstname;
      userCreate.lastname = user.lastname;
      userCreate.password = user.password;

      return await this.repository.create(userCreate);
    } catch (error) {
      console.log("recibiendo error service");
      return Promise.reject(error);
    }
  }
  async getAll() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.log("recibiendo error service");
      return Promise.reject(error);
    }
  }

  async findOne(query: object) {
    try {
      return await this.repository.findOne(query);
    } catch (error) {
      console.log("recibiendo error service");
      return Promise.reject(error);
    }
  }

  async findOneById(userId: string) {
    try {
      return await this.repository.findOneById(userId);
    } catch (error) {
      console.log("recibiendo error service");
      return Promise.reject(error);
    }
  }

  async setFavoritePokemon(userId: string, idPokemon: number) {
    try {
      const user = await this.repository.findOneById(userId);
      console.log("user favorite:", user);
      if (user) {
        if (!user.favorites.includes(idPokemon)) {
          user.favorites.push(idPokemon);
          await user.save();
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeFavoritePokemon(userId: string, idPokemon: number) {
    const user = await this.findOneById(userId);
    console.log("user favorite:", user);
    if (user?.favorites) {
      const updateFavorites = user?.favorites.filter(
        (pokemonId) => pokemonId !== idPokemon
      );
      user.favorites = updateFavorites;
      await user.save();
      return user.favorites;
    }
  }
}
