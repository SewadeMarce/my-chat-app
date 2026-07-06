import { Outlet, redirect } from "react-router";
import { Sidebare } from "~/components/Sidebar";
import BorderAnimatedContainer from "~/components/BorderAnimatedContainer";
import { MessagesService, User } from "~/services/data.service";
import type { Route } from "./+types/chat";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import useSocket from "~/hooks/useHook";

export async function clientLoader() {

  await User.checkAuth()
  if (!User.authUser) throw redirect("/login");
  const allContacts = MessagesService.getAllContacts()
  const myChatPartners = MessagesService.getMyChatPartners()
  return {
    user: User.authUser,
    allContacts,
    myChatPartners
  }
}
// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const formData = await request.formData();
//   const json = await request.json();
//   console.log({ json });

// }
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const condition = formData.get('condition');

  switch (condition) {
    case 'updateProfile':
      const profilePic = formData.get('profilePic')
      await User.updateProfile({ profilePic });
      break;
    case 'logout':
      await User.logout();
      break;
  }

  return {
    erreur: User.erreur,
    success: User.success,
  }

}
export default function Layout({ loaderData }: Route.ComponentProps) {

  const { user } = loaderData
  const Socket = useSocket()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    Socket.initsenderId(user._id)
    Socket.connectSocket()
  }, [user._id]);

  useEffect(() => {
    Socket.newMessage();

    return () => Socket.offMessage()
  }, [Socket.receiverId])
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 shadow-lg lg:hidden"
        >
          <Menu className="size-4" />
          Menu
        </button>

        <div
          className={`absolute inset-y-0 left-0 z-20 w-full max-w-[20rem] transition-transform duration-300 ease-out lg:relative lg:w-auto lg:max-w-none lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <Sidebare
            onlineUsers={Socket.onlineUsers}
            isSoundEnabled={Socket.isSoundEnabled}
            toggleSound={Socket.toggleSound}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {isSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 z-10 bg-slate-950/70 lg:hidden"
            aria-label="Fermer la sidebar"
          />
        )}

        <main className="ml-0 flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm min-w-0 lg:ml-0">
          <Outlet context={Socket} />
        </main>
      </BorderAnimatedContainer>
    </div>
  )
}