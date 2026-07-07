import { Suspense, useState } from "react"
import ProfileHeader from "./ui/ProfileHeader"
import ActiveTabSwitch from "./ui/ActiveTabSwitch"
import { Await, useLoaderData } from "react-router"
import ContactList from "./ui/ContactList"
import UsersLoadingSkeleton from "./ui/UsersLoadingSkeleton"
import ChatsList from "./ui/ChatsList"
import { X } from "lucide-react"

export const Sidebare = ({ onlineUsers, isSoundEnabled, toggleSound, onClose }:
  { onlineUsers: string[], isSoundEnabled: boolean, toggleSound: () => void, onClose?: () => void }) => {
  const [activeTab, setActiveTab] = useState('chats')
  const { allContacts, myChatPartners } = useLoaderData()

  return (
    <>
      <div className="h-full w-full max-w-[20rem] bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/60 lg:w-80 lg:max-w-none">
        <div className="flex items-center justify-between border-b border-slate-700/60 p-4 lg:hidden">
          <p className="text-sm font-medium text-slate-300"></p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-700/60 hover:text-white"
            aria-label="Fermer la sidebar"
          >
            <X className="size-4" />
          </button>
        </div>

        <ProfileHeader 
        onlineUsers={onlineUsers} 
        isSoundEnabled={isSoundEnabled} 
        toggleSound={toggleSound}
        />
        <ActiveTabSwitch active={activeTab} setActive={setActiveTab} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ?
            <Suspense fallback={<UsersLoadingSkeleton />} >
              <Await resolve={myChatPartners}>
                <ChatsList onlineUsers={onlineUsers} />
              </Await>
            </Suspense>
            : <Suspense fallback={<UsersLoadingSkeleton />} >
              <Await resolve={allContacts}>
                <ContactList onlineUsers={onlineUsers} />
              </Await>
            </Suspense>}
        </div> 
      </div>
    </>
  )
}