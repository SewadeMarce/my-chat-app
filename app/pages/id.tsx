import ChatHeader from "~/components/chat/ChatHeader";
import MessageInput from "~/components/chat/MessageInput";
import { Messages, User } from "~/services/data.service";
import type { Route } from "./+types/id";
import NoChatHistoryPlaceholder from "~/components/chat/NoChatHistoryPlaceholder";
import { useRef } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {

  const messagesByUserI = await Messages.getMessagesByUserId(params.id)
  const selectedUser = Messages.allContacts.filter(contacts => contacts._id === params.id)
  Messages.selectedUser = selectedUser[0]
  return messagesByUserI
};
export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const text = formData.get('text') as string;
  const image = formData.get('file') as string;
  if (!text?.trim() && !image) return;


  await Messages.sendMessage({ text, image }, params.id)


}
function ChatContainer({ loaderData }: Route.ComponentProps) {
  const messageEndRef = useRef(null);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {loaderData.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {loaderData.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === Messages.selectedUser?._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${msg.senderId === Messages.selectedUser?._id
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-200"
                    }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={Messages.selectedUser?.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
