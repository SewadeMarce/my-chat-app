import type { Request, Response } from "express";
import User from "../models/User.ts";
import { Session } from "../lib/utils.ts";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.ts";



export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    // vérifie que l'email est valide avec une regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Cet e-mail existe déjà" });

    //  123456 => $dnjasdkasj_?dmsakmk
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      const payload = {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      }
     Session.session(payload,res)
    
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });


    } else {
      res.status(400).json({ message: "Données utilisateur invalides" });
    }
  } catch (error) {
    console.log("Erreur dans le contrôleur d'inscription :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Identifiants invalides" });
    // ne jamais expliquer au client si c'est l'email ou le mot de passe qui est incorrect

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Identifiants invalides" });

    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    };

    Session.session(payload, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Erreur dans le contrôleur de connexion :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const logout = (_: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Déconnexion réussie" });
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "La photo de profil est requise" });

    const userId = req.user?._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: 'uploadResponse.secure_url ' },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
