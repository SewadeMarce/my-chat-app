import React, { useEffect, useRef } from "react";
import MessageBubble from "./Message";

type Props = {
  messages: Array<Record<string, any>>;
  currentUserId?: string | null;
};

export default function MessagesList({ messages, currentUserId }: Props) {
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentUserId]);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {messages.map((msg, i) => {
        const isMine = msg.senderId === currentUserId;
        const avatar = msg.senderProfile?.profilePic || msg.profilePic || null;
        const senderName = msg.senderProfile?.fullName || msg.senderName || null;

        return (
          <div key={msg._id}>
            <MessageBubble msg={msg} isMine={isMine} avatar={avatar} senderName={senderName} />
          </div>
        );
      })}
      <div ref={messageEndRef} />

    </div>
  );
}
