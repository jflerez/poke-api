import { Request, Response, NextFunction } from "express";
import mapper from "../helpers/mapper.helper";
import { UserCreateDto } from "../dtos/user-create";
import { UserService } from "../services/user.service";
import { UserRepository } from "../dal/repositories/user.repository";
import {
  comparePassword,
  createToken,
  decodeJWT,
} from "../helpers/security.helper";
import { UserLoginDto } from "../dtos/user-login";

export class AuthController {
  private userService = new UserService();

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const authDtoData: UserCreateDto = mapper(req.body, UserCreateDto);
      console.log("record: ", authDtoData);

      const user = await this.userService.findOne({
        email: authDtoData.email,
      });

      if (user) {
        res.status(400).json({
          message: "Ya cuentas con una cuenta activa!",
          success: false,
        });
      }
      await this.userService.add(authDtoData);
      res.send({ message: "Registro realizado exitosamente" });
    } catch (error) {
      console.log("error in register: ", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const authDtoData: UserLoginDto = mapper(req.body, UserLoginDto);
      const user = await this.userService.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "email o contraseña no válidos.", success: false });
      }

      const isMatch = await comparePassword(
        authDtoData.password,
        user.password
      );
      if (isMatch) {
        return res.status(200).json({
          message: `Bienvenido ${user.firstname}`,
          token: createToken(user),
          success: true,
        });
      }

      return res.status(400).json({
        message: "Credeciales no validas",
        success: false,
      });
    } catch (error) {
      console.log("error in login: ", error);
      next(error);
    }
  }
}
