import type { Socket } from "socket.io-client";

export type userType = {
    _id: string;
    profilePic: string;
    fullName: string;


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
    authUser: userType | null;
    isCheckingAuth: boolean;
    socket: Socket | null;
    onlineUsers: string[];
    isSigningUp: boolean;
    isLoggedIn: boolean;
    login: (data?: {}) => Promise<void>;
    signup: (data: {}) => Promise<void>;
    checkAuth: () => Promise<string | undefined>;
    logout: () => Promise<void>;
    updateProfile: (data: {}) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void
}


