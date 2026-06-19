import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

function ChatHeader() {
const selectedUser = useLoaderData()
 const navigate = useNavigate()

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={"/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
          {/* <p className="text-slate-400 text-sm">{isOnline ? "En ligne" : "Hors ligne"}</p> */}
        </div>
      </div>

      <button onClick={() => navigate(-1)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;
