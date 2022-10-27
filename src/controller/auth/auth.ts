import { UserOrm } from "@/domain/orm";
import { AuthService } from "@/domain/services/auth";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const user = req.body;

      const userExists = await UserOrm.userExistsByEmail(user.email);

      if (userExists) {
        return res.status(400).json({ error: "user already exists" });
      }
      const newUser = await UserOrm.createUser(user);
      const access_token = AuthService.singAuth({ id: newUser._id });
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(500).json({ error: "something unexpected happened" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
      const userExists = await UserOrm.userExistsByEmail(credentials.email);

      if (!userExists) {
        return res.status(400).json({ error: "username does not exist" });
      }

      const comparePassword = await bcrypt.compare(
        credentials.password,
        userExists.password
      );
      if (!comparePassword) {
        return res.status(400).json({
          error:
            "an error occurred with the credentials, check the email or password",
        });
      }
      const access_token = AuthService.singAuth({ id: userExists._id });
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(500).json({ error: "something unexpected happened" });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const token = req.header("x-token");
      if (!token) {
        return res.status(403).json({ message: "PERMISSION DENIED" });
      }

      const resDecode: any = AuthService.decodeSing(token);

      const userExists = await UserOrm.userFindById(resDecode.id);
      res.status(200).json({ user: userExists });
    } catch (error) {
      res.status(500).json({ error: "something unexpected happened" });
    }
  },
};
