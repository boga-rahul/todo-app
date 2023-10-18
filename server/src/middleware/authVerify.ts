import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authVerify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied!");
  try {
    if (process.env.TOKEN_SECRET) {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    }
    // req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default authVerify;
