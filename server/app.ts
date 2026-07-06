
import express from "express";
import apiRouter from "./routes/api.route.ts";
import cookieParser from "cookie-parser";
import http from "http";

import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middleware/socket.auth.middleware.ts";

const app = express();
app.use(express.json({ limit: "5mb" })); // requête JSON
app.use(cookieParser());
app.use('/api',apiRouter)


export function getReceiverSocketId(userId:string) {
  return userSocketMap[userId];
}




const server = http.createServer(app);

 const io = new Server(server,);

// stockage des utilisateurs en ligne
const userSocketMap:Record<string,string> = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("Utilisateur connecté", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() envoie les événements à tous les clients connectés
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // avec socket.on on écoute les événements des clients
  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

io.use(socketAuthMiddleware);


export { io, server };

export default app;