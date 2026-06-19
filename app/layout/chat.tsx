import { Outlet, redirect } from "react-router";
import BorderAnimatedContainer from "~/components/BorderAnimatedContainer";
import SidebarLeft from "~/components/chat/sidebar";
import { Messages, User } from "~/services/data.service";

export async function clientLoader() {

    await User.checkAuth()
    if (!User.authUser) throw redirect("/login");
    const allContacts = await Messages.getAllContacts()
    const myChatPartners = await Messages.getMyChatPartners() 
    console.log(User.authUser, {allContacts,myChatPartners});
    return {
        allContacts,
        myChatPartners
    }

}

export default function Layout() {

    return (
        <div className="relative w-full max-w-6xl h-[800px]">
            <BorderAnimatedContainer>
                <SidebarLeft />
                <main className="flex-1 flex flex-col bg-slate-900 backdrop-blur-sm">
                    <Outlet />

                </main>
            </BorderAnimatedContainer>
        </div>
    )
}