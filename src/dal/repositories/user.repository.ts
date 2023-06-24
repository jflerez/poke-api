import { IUser } from "../../interfaces/user.model";
import UserSchema from "../models/user";
import { CrudRepository } from "./crud.repository";

export class UserRepository extends CrudRepository<IUser> {}
