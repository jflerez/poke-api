import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interfaces/user.model";
import bcrypt from "bcrypt";

export const createToken = (user: IUser) => {
  return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
    expiresIn: 86400,
  });
};

export const comparePassword = async (
  passwordRequest: string,
  passwordDb: string
) => {
  return await bcrypt.compare(passwordRequest, passwordDb);
};

export const decodeJWT = (token: string) => {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  console.log("decoded: ", decoded); // bar
};
