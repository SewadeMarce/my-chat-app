import { Outlet, redirect } from "react-router";
import BorderAnimatedContainer from "~/components/BorderAnimatedContainer";
import { User } from "~/services/data.service";
export async function clientLoader() {

    await User.checkAuth();

    if (User.authUser) throw redirect("/chat-app");
    console.log(User.authUser);

}
export default function AuthLayout() {

    return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-6xl md:h-800px h-650px">
            <BorderAnimatedContainer>
                <Outlet />
            </BorderAnimatedContainer>
            </div>
    </div>
    )
}