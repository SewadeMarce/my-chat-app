import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.ts";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../../controllers/message.controller.ts";

const messagesRouter = express.Router();

// les middlewares s'exécutent dans l'ordre - les requêtes sont d'abord limitées par le taux, puis authentifiées.
// cela est plus efficace car les requêtes non authentifiées sont bloquées par la limitation de débit avant d'atteindre le middleware d'authentification.
messagesRouter.use(protectRoute);

messagesRouter.get("/contacts", getAllContacts);
messagesRouter.get("/chats", getChatPartners);
messagesRouter.get("/:id", getMessagesByUserId);
messagesRouter.post("/send/:id", sendMessage);

export default messagesRouter;
