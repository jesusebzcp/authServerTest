import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

interface SingAuth {
  id: string;
}

export const AuthService = {
  singAuth: (payload: SingAuth) => {
    return jwt.sign(payload, process.env.KEYWORD_SECRET, {
      algorithm: "HS256",
      expiresIn: "48H",
    });
  },

  decodeSing: (token: string) => {
    return jwt.verify(token, process.env.KEYWORD_SECRET);
  },
};
