import type { Request, Response } from "express";
import User from "../models/User.ts";
import Message from "../models/Message.ts";
import cloudinary from "../lib/cloudinary.ts";



export const getAllContacts = async (req:Request, res:Response) => {
  try {
    const loggedInUserId = req.user?._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Erreur dans getAllContacts :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};



export const getChatPartners = async (req:Request, res:Response) => {
  try {
    const loggedInUserId = req.user?._id;

    // trouve tous les messages où l'utilisateur connecté est expéditeur ou destinataire
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId?.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error:any) {
    console.error("Erreur dans getChatPartners : ", error?.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


export const getMessagesByUserId = async (req:Request, res:Response) => {
  try {
    const myId = req.user?._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error:any) {
    console.log("Erreur dans le contrôleur des messages : ", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


export const sendMessage = async (req:Request, res:Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Le texte ou l'image est requis." });
    }
    if (senderId?.equals(receiverId as string)) {
      return res.status(400).json({ message: "Vous ne pouvez pas vous envoyer de message à vous-même." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Destinataire introuvable." });
    }

    let imageUrl;
    if (image) {
      // upload de l'image base64 vers Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

   // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(newMessage);
  } catch (error:any) {
    console.log("Erreur dans le contrôleur d'envoi de message : ", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
