import React from "react";

type MessageBubbleProps = {
  msg: Record<string, any>;
  isMine: boolean;
  avatar?: string | null;
  senderName?: string | null;
};

export default function MessageBubble({ msg, isMine, avatar, senderName }: MessageBubbleProps) {
  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine && (
        <div className="mr-3 shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
            <img src={avatar || "/avatar.png"} alt={senderName || "Utilisateur"} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className={`chat-bubble rounded-2xl p-2 relative max-w-[78%] ${isMine ? "bg-cyan-600 text-white ml-3" : "bg-slate-800 text-slate-200"} ${msg.isOptimistic ? "opacity-80 italic" : ""}`}>
        {msg.image && (
          <img src={msg.image} alt="Shared" className="rounded-lg max-h-48 w-full object-cover" />
        )}

        {msg.text && <p className="mt-2 whitespace-pre-line">{msg.text}</p>}

        <p className="text-xs mt-2 opacity-75 text-right">
          {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "..."}
        </p>
      </div>

      {isMine && (
        <div className="ml-3 shrink-0 hidden sm:block">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
            <img src={msg.senderProfile?.profilePic || "/avatar.png"} alt={msg.senderProfile?.fullName || "Vous"} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
