
import { axiosInstance } from "~/lib/lib";

type userType = {
  _id: string;
  profilePic: string;
  fullName: string;


}
interface userInteerface {
  authUser: null | userType;
  erreur: null | string;
  success: null | string;
  login: (data?: object) => Promise<void>;
  signup: (data: object) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: object) => Promise<void>;
}
export const User: userInteerface = {
  authUser: null,
  erreur: null,
  success: null,
  login: async function (data) {
    try {

      const res = await axiosInstance.post("/auth/login", data);
      this.authUser = res.data;
      console.log("Connexion réussie", { Utilisateur: this.authUser });

    } catch (error: any) {
      this.erreur = error.response.data.message;
      console.error("erreur lors de la connexion : ", this.erreur);

    }
  },
  signup: async function (data) {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      this.authUser = res.data;

      console.log("Compte créé avec succès !", { Utilisateur: this.authUser });
    } catch (error: any) {
      this.erreur = error.response.data.message;
      console.error("erreur lors de la connexion : ", this.erreur);
    }
  },

  checkAuth: async function () {
    try {
      const res = await axiosInstance.get("/auth/check");
      this.authUser = res.data;
      // console.log("Authentification  réussie !", { Utilisateur: this.authUser });

    } catch (error) {
      this.authUser = null;
      console.log("Erreur lors de la vérification d'authentification :", this.erreur);
    }
  },
  logout: async function () {
    try {
      await axiosInstance.post("/auth/logout");
      this.authUser = null;
      this.success = "Déconnexion réussie "
    } catch (error) {
      this.erreur = "Erreur lors de la déconnexion";
    }
  },

  updateProfile: async function (data) {

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      this.authUser = res.data;
      this.success = "Profil mis à jour avec succès : ";
    } catch (error) {
      this.erreur = "Erreur lors de la mise à jour du profil ";
    }
  },

}

export const MessagesService = {

  getAllContacts: async function () {
    try {
      const res = await axiosInstance.get("/messages/contacts");
      return res.data
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  },
  getMyChatPartners: async () => {
    try {
      const res = await axiosInstance.get("/messages/chats");
      return res.data;
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  },
  getMessagesByUserId: async (userId: string) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      return res.data;
    } catch (error: any) {
      console.error(error.response?.data?.message || "Une erreur est survenue");
    }
  },
  sendMessage: async function (messageData: { text: string, image: File | null }, id: string) {

    try {
      const res = await axiosInstance.post(`/messages/send/${id}`, messageData);
      return res.data;
    } catch (error: any) {

      console.error(error.response?.data?.message || "Une erreur est survenue");
    }
  },


}
