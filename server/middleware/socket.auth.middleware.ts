
import type { Socket } from "socket.io";

import User from "../models/User.ts";
import { Session } from "../lib/utils.ts";

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    // extrait le token depuis les cookies http-only
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row: string) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Connexion socket rejetée : aucun token fourni");
      return next(new Error("Non autorisé - Aucun token fourni"));
    }

    // vérifie le token
    const decoded = Session.decoded(token);
    if (!decoded) {
      console.log("Connexion socket rejetée : token invalide");
      return next(new Error("Non autorisé - Token invalide"));
    }

    // recherche l'utilisateur dans la base
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      console.log("Connexion socket rejetée : utilisateur introuvable");
      return next(new Error("Utilisateur introuvable"));
    }

    // attache les informations utilisateur au socket
    socket.user = user as Socket["user"];
    socket.userId = user._id.toString();

    console.log(`Socket authentifié pour l'utilisateur : ${user.fullName} (${user._id})`);

    next();
  } catch (error) {
    console.log("Erreur lors de l'authentification socket :",error instanceof Error ? error.message :error  );
    next(new Error("Non autorisé - Échec de l'authentification"));
  }
};
