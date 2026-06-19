
function ActiveTabSwitch({
  activeTab, setActiveTab
}: { activeTab: string, setActiveTab: (tab: string) => void }
) {

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chat")}
        className={`tab ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
          }`}
      >
        Conversations
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
