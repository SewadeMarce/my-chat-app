import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useSocketContext } from "~/hooks/useHook";

function ChatHeader() {
  const { partners:selectedUser, } = useLoaderData();
  const Socket = useSocketContext()
  const isOnline = Socket.onlineUsers.includes(selectedUser?._id);
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscKey = (event:KeyboardEvent) => {
      if (event.key === "Escape") navigate('/chat-app');
    };

    window.addEventListener("keydown", handleEscKey);

    // fonction de nettoyage
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [navigate]);

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-21 px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser?.fullName}</h3>
          <p className="text-slate-400 text-sm">{isOnline ? "En ligne" : "Hors ligne"}</p>
        </div>
      </div>

      <button onClick={() => navigate('/chat-app')} aria-label="Fermer la discussion">
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;
