import { useEffect, useState } from "react"
import ActiveTabSwitch from "./ActiveTabSwitch"
import ProfileHeader from "./ProfileHeader"
import ChatsList from "./ChatsList"
import ContactList from "./ContactList"

const SidebarLeft = () => {
  const [activeTab, setActiveTab] = useState('chats')
  
  useEffect(()=>{
    console.log({activeTab});
    
  },[activeTab])
  return (
    <div className="w-80 bg-slate-800 backdrop-blur-sm flex flex-col">
      <ProfileHeader />
      <ActiveTabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        { <ContactList />}
      </div>
    </div>
  )
}
export default SidebarLeft;