import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interfaces/user.model";
import bcrypt from "bcrypt";

export const createToken = (user: IUser) => {
  return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const comparePassword = async (
  passwordRequest: string,
  passwordDb: string
) => {
  return await bcrypt.compare(passwordRequest, passwordDb);
};

export const decodeJWT = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
