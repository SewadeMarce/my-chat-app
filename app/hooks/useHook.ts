import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import type { Socket } from "socket.io";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export type SocketType = {

  initsenderId: (id: string) => void;
  initreceiverId: (id: string) => void;
  initmessages: (data: MessageType[]) => void;
  connectSocket: () => void;
  optimisticMessage: (formData: { text: string; image: string; }) => void;
  onMessage: (data: MessageType) => void;
  newMessage: () => void;
  offMessage: () => Socket | undefined;
  disconnectSocket: () => void;
 playRandomKeyStrokeSound: () => void
} & StateType
type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
  isOptimistic: boolean;
}
type StateType = {
  socket: Socket | null;
  onlineUsers: string[];
  messages: MessageType[];
  senderId: string;
  receiverId: string;
  keyStrokeSounds: HTMLAudioElement[];
  isSoundEnabled: boolean
}
export function useSocketContext() {

  return useOutletContext<SocketType>();
}
export default function useSocket() {

  const [get, set] = useState<StateType>({
    socket: null,
    onlineUsers: [],
    messages: [],
    senderId: '',
    receiverId: '',
    keyStrokeSounds: [
      new Audio("/sounds/keystroke1.mp3"),
      new Audio("/sounds/keystroke2.mp3"),
      new Audio("/sounds/keystroke3.mp3"),
      new Audio("/sounds/keystroke4.mp3"),
    ],
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") as string) === true
  });

  return {
    onlineUsers: get.onlineUsers,
    socket: get.socket,
    messages: get.messages,
    senderId: get.senderId,
    receiverId: get.receiverId,
    keyStrokeSounds: get.keyStrokeSounds,
    isSoundEnabled: get.isSoundEnabled,

    initsenderId: (id: string) => set(state => ({ ...state, senderId: id })),
    initreceiverId: (id: string) => set(state => ({ ...state, receiverId: id })),
    initmessages: (data: MessageType[]) => set(state => ({ ...state, messages: data })),

    connectSocket: function () {
      if (get?.socket?.connected) return;

      const socket = io(BASE_URL, {
        withCredentials: true,
      });

      socket.connect();

      this.socket = socket as unknown as Socket
      //  set(state => ({ ...state, socket: socket as unknown as Socket}))

      // écoute de l'événement des utilisateurs en ligne
      socket.on("getOnlineUsers", (userIds) => {
        set(state => ({ ...state, onlineUsers: userIds }))
      });

      return socket

    },
    optimisticMessage: (formData: { text: string; image: string; }) => {
      const tempId = `temp-${Date.now()}`;

      const optimisticMessage = {
        _id: tempId,
        senderId: get.senderId,
        receiverId: get.receiverId,
        text: formData.text,
        image: formData.image,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      set(state => ({ ...state, messages: state.messages.concat(optimisticMessage) }));
      console.log('apres : ', get.messages.length);

    },
    onMessage: (data: MessageType) => {
      console.log({ data: data, avant: get.messages.length });
      set(state => ({ ...state, messages: state.messages.map(s => s.isOptimistic !== data.isOptimistic ? data : s) }));
      console.log('apres : ', get.messages.length);

    },
    newMessage: function () {
      if (this.socket) {
        console.log('On a SSSocket');

      }
      this.socket?.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === get.senderId;
        console.log({ isMessageSentFromSelectedUser });
        console.log('isMessageSentFromSelectedUser :', isMessageSentFromSelectedUser);
        if (isMessageSentFromSelectedUser) return;
        console.log({ newMessage });

        set(state => ({ ...state, messages: state.messages.concat(newMessage) }));

      })
    },



    offMessage: function () { 
      this.socket?.off("newMessage", (arg) => console.log(arg))
     },

    disconnectSocket: () => { if (get.socket?.connected) get?.socket.disconnect(); }

    ,
    playRandomKeyStrokeSound: () => {
      const randomSound = get.keyStrokeSounds[Math.floor(Math.random() * get.keyStrokeSounds.length)];

      randomSound.currentTime = 0; // améliore l'expérience utilisateur
      randomSound.play().catch((error) => console.log("Échec lecture audio :", error));
    }
    , toggleSound: () => {
      localStorage.setItem("isSoundEnabled", `${!get.isSoundEnabled}`);
      set(state => ({ ...state, isSoundEnabled: !get.isSoundEnabled }));
    },
  }

}
type ContextType = {
  c: number;
  n: number;
  s: string;
  inc: () => void;
  dec: () => void;
  stg: (d: string) => void;
  num: (d: number) => void;
}
type loaderDataType = {
  c: number, n: number, s: string
}
export function useExp() {
  return useOutletContext<ContextType>();
}
export function useEx(
  loaderData: loaderDataType
) {
  // const loaderData = useLoaderData()

  const [get, set] = useState<{ c: number, n: number, s: string }>(loaderData)

  const v = {
    c: get.c,
    n: get.n,
    s: get.s,

    inc: () => set(state => ({ ...state, c: state.c + 1 })),
    dec: () => set(state => ({ ...state, c: state.c - 1 })),
    stg: (d: string) => set(state => ({ ...state, s: d }))
  }

  return {
    c: get.c,
    n: get.n,
    s: get.s,

    inc: () => set(state => ({ ...state, c: state.c + 1 })),
    dec: () => set(state => ({ ...state, c: state.c - 1 })),
    stg: (d: string) => set(state => ({ ...state, s: d })),
    num: (d: number) => set(state => ({ ...state, n: d }))
  }

}