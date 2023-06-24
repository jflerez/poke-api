import { Request, Response, NextFunction } from "express";
import config from "../config";

import jwt from "jsonwebtoken";

// middleware to validate token (rutas protegidas)

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Acceso denegado", success: false });
  try {
    const verified = jwt.verify(token, config.JWT_SECRET);
    console.log("verified: ", verified);
    (req as any).user = verified;

    next();
  } catch (err) {
    res.status(401).json({ message: "token no es válido", success: false });
  }
}
