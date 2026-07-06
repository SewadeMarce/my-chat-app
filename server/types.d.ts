declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: UserPayload;
    }
    interface UserPayload {
      _id: Types.ObjectId;
      fullName: string;
      email: string;
      profilePic?: string;
    }
  }
}

declare module "socket.io" {
  interface Socket {
    user: Express.UserPayload;
    userId: string;
  }
}

export {}