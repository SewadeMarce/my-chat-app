import User from "../models/User.ts";
import type { NextFunction, Request, Response } from "express";
import { Session } from "../lib/utils.ts";



export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Non autorisé - Aucun token fourni" });

    const decoded = Session.decoded(token);
    if (!decoded) return res.status(401).json({ message: "Non autorisé - Token invalide" });
 
    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Erreur dans le middleware protectRoute :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
