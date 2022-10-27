import { Request, Response, NextFunction } from "express";

export const applyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const token = req.header("authorization");

  try {
    if (token.replace("Bearer ", "") !== process.env.AUTHORIZATION) {
      return res.status(403).json({ message: "PERMISSION DENIED" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "PERMISSION DENIED" });
  }
};
