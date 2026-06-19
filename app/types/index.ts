import type { Socket } from "socket.io-client";

export type UserType = {
_id:string;
profilePic:string;
fullName:string;


}
export type MessageType = {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: string;
    createdAt: string;
    isOptimistic: boolean;
}
export interface UserIt {
    authUser: UserType | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggedIn: boolean;
    login: (data?: {}) => Promise<void>;
    signup: (data: {}) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: {}) => Promise<void>;
}


