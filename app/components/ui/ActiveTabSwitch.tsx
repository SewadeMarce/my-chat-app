
function ActiveTabSwitch({ active, setActive } :{active: string,setActive: (tab: string) => void}) {
 
  return (
    <div className="tabs flex justify-around tabs-boxed bg-slate-900/70 p-2 m-2 rounded-2xl border border-slate-700">
      <button
        type="button"
        onClick={() => setActive("chats")}
        className={`px-4 py-2 font-medium cursor-pointer ${active === "chats" ? " text-cyan-400 " : "text-slate-400"}  bg-cyan-500/10  rounded-full hover:bg-cyan-500/20 transition-colors`}
      >
        Conversations
      </button>

      <button
        type="button"
        onClick={() => setActive("contacts")}
        className={`px-4 py-2 font-medium cursor-pointer ${active === "contacts" ? " text-cyan-400" : "text-slate-400"}   bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 transition-colors`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
