
function ActiveTabSwitch({ active, setActive } :{active: string,setActive: (tab: string) => void}) {
 
  return (
    <div className="tabs flex justify-around tabs-boxed bg-slate-900/70 p-2 m-2 rounded-2xl border border-slate-700">
      <button
        type="button"
        onClick={() => setActive("chats")}
        className={`tab cursor-pointer ${active === "chats" ? "tab-active text-cyan-400" : "text-slate-400"}`}
      >
        Conversations
      </button>

      <button
        type="button"
        onClick={() => setActive("contacts")}
        className={`tab cursor-pointer ${active === "contacts" ? "tab-active text-cyan-400" : "text-slate-400"}`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
