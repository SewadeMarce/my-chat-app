import NoChatsFound from "./NoChatsFound";
import { Link, useAsyncValue, } from "react-router";
import type { userType } from "~/types";

function ChatsList({ onlineUsers, }: { onlineUsers?: string[] }) {

  const MyChatPartners = useAsyncValue() as userType[];

  return (
    <>
      {MyChatPartners.length === 0 ? <NoChatsFound /> :
        <>  {MyChatPartners.map((chat) => (
          <Link
            to={`${chat._id}`}
            key={chat._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`avatar ${onlineUsers?.includes(chat._id) ? "online" : "offline"}`}>
                <div className="size-12 rounded-full">
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
                </div>
                {onlineUsers?.includes(chat._id) ?
                  <p className="text-green-400 text-xs">En ligne</p>
                  : ""}
              </div>
              <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
            </div>
          </Link>
        ))}
        </>
      }
    </>
  );
}
export default ChatsList;
