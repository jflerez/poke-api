import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import mapper from "../helpers/mapper.helper";

// Función middleware para validar un objeto utilizando class-validator
export function requestValidate(
  type: any
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = mapper(req.body, type, false);

    validate(dto).then((errors) => {
      console.log("errors validation request: ", errors);
      if (errors.length > 0) {
        const validationErrors = errors.map((error) =>
          Object.values(error.constraints ? error.constraints : "").toString()
        );

        return res.status(400).json({ errors: validationErrors });
      }
      req.body = dto;
      next();
    });
  };
}
