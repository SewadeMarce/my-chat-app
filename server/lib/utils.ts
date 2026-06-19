import jwt, { type Secret } from "jsonwebtoken";
import { ENV } from "../config/env.ts";
import type { Response } from "express";
import type { Types } from "mongoose";
interface UserPayload {
      _id: Types.ObjectId;
      fullName: string;
      email: string;
      profilePic?: string;
    }
export const generateToken = (userId: string, res: Response) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET non configuré");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // empêche les attaques XSS : cross-site scripting
    sameSite: "strict", // protège contre les attaques CSRF
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
export const Session = {
  token:"",
  JWT_SECRET: ENV.JWT_SECRET,

  generate: function (userPayload:UserPayload) {
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET non configuré");
    }

     this.token = jwt.sign(userPayload, this.JWT_SECRET, {
      expiresIn: "7d",
    });


  },
  decoded: function (token: string) {

    return jwt.verify(token, this.JWT_SECRET as Secret) as UserPayload;

  },
  coockie:function (res:Response) {
     res.cookie("jwt", this.token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // empêche les attaques XSS : cross-site scripting
    sameSite: "strict", // protège contre les attaques CSRF
    secure: ENV.NODE_ENV === "development" ? false : true,
  });
  },
  session:function (userPayload:UserPayload,res:Response) {
    this.generate(userPayload);
    this.coockie(res)
    
  },
  delecte:function name(res:Response) {
      res.cookie("jwt", "", { maxAge: 0 });

  }

}

// http://localhost
// https://dsmakmk.com
