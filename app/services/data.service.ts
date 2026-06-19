import toast from "react-hot-toast";
import { axiosInstance } from "~/lib/lib";
import type { UserIt } from "~/types";

export const User: UserIt = {
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggedIn: false,


  login: async function (data = {}) {
    try {

      const res = await axiosInstance.post("/auth/login", data);
      console.log({ res });

      this.authUser = res.data;
      this.isLoggedIn = true
      console.log(this.authUser, this.isLoggedIn);
      toast.success("Connexion réussie");
      console.log("Connexion réussie");

    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);

    }
  },
  signup: async function (data: {}) {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      this.authUser = res.data;
      this.isLoggedIn = true
      console.log(this.authUser, this.isLoggedIn);

      toast.success("Compte créé avec succès !");
      console.log("Compte créé avec succès !");
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  },

  checkAuth: async function () {
    try {
      this.isCheckingAuth = true;
      const res = await axiosInstance.get("/auth/check");
      this.authUser = res.data;
    } catch (error) {
      console.error("Erreur lors de la vérification d'authentification :", error);
      this.authUser = null;
    } finally {
      this.isCheckingAuth = false;
    }
  },
  logout: async function () {
    try {
      await axiosInstance.post("/auth/logout");
      this.authUser = null;
      toast.success("Déconnexion réussie");
      console.log("Déconnexion réussie");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
      console.error("Erreur lors de la déconnexion :", error);
    }
  },

  updateProfile: async function (data: {}) {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      this.authUser = res.data;
      toast.success("Profil mis à jour avec succès");
      console.log("Profil mis à jour avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil :", error, error.response.data.message);
    }
  },


}

export const Messages = {
  selectedUser: null,
  allContacts:[],
  getAllContacts: async function () {
    try {
      const res = await axiosInstance.get("/messages/contacts");
      this.allContacts = res.data
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
  sendMessage: async function (messageData: Record<string, string>, id: string) {

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: User.authUser?._id,
      receiverId: id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // met à jour immédiatement l'interface en ajoutant le message

    try {
      const res = await axiosInstance.post(`/messages/send/${id}`, messageData);
      return res.data;
    } catch (error:any) {
      // supprime le message optimiste en cas d'échec
      console.error(error.response?.data?.message || "Une erreur est survenue");
    }
  },

}