import { Request, Response, NextFunction } from "express";
import config from "../config";

import jwt from "jsonwebtoken";

// middleware to validate token (rutas protegidas)
export function verifyTokens(): (
  req: Request,
  res: Response,
  next: NextFunction
) => void {
  console.log("llefaaaa");
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("llefaaaa ok");
    const authHeader = req.headers["authorization"];
    console.log("authHeader", authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Acceso denegado" });
    try {
      const verified = jwt.verify(token, config.JWT_SECRET);
      // req.headers = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: "token no es válido" });
    }
  };
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado", success: false});
  try {
    const verified = jwt.verify(token, config.JWT_SECRET);
    console.log("verified: ", verified);
    (req as any).user = verified;

    next();
  } catch (err) {
    // res.status(400).json({ error: "token no es válido" });
  }
}
