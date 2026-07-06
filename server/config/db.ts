import mongoose from "mongoose";
import { MONGO_URI } from "./env.ts";

export const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(MONGO_URI as string);
    console.log("Connexion à MongoDB réussie :", conn.connection.host);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // 1 signifie échec, 0 signifie succès
  }
};
