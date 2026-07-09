import { MessageCircleIcon } from "lucide-react";

function NoChatsFound({setActive}:{setActive:(arg:string)=> void}) {

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">Aucune conversation pour l'instant</h4>
        <p className="text-slate-400 text-sm px-6">
          Lancez une nouvelle discussion en sélectionnant un contact dans l'onglet contacts
        </p>
      </div>
      <button
       onClick={() => setActive("contacts")}
        className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
      >
        Trouver des contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
