import { Link } from "react-router";
import { SparklesIcon, ArrowRightIcon } from "lucide-react";
import BorderAnimatedContainer from "~/components/BorderAnimatedContainer";
import { User } from "~/services/data.service";
import { redirect } from "react-router";
import PageLoader from "~/components/ui/PageLoader";

export async function clientLoader() {
  await User.checkAuth()
  if (User.authUser) throw redirect("/chat-app");

}
export function HydrateFallback() {

  return (
    <PageLoader />
  )
}
function HomePage() {
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[750px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full grid gap-8 md:grid-cols-[58%_42%] overflow-y-auto">
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300 mb-6 text-sm font-medium">
                <SparklesIcon className="w-5 h-5" />
                Messagerie instantanée
              </span>

              <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 leading-tight">
                Discutez autrement avec des messages en temps réel.
              </h1>

              <p className="mt-6 text-slate-400 max-w-xl leading-7">
                Rejoignez une application de chat moderne qui combine communication fluide,
                profils personnalisés et un design épuré pour rester connecté plus simplement.
              </p>
            </div>

            <div className="p-8 flex flex-col gap-8">
              <div
                className="flex-1 rounded-3xl border border-slate-700 overflow-hidden bg-cover bg-center relative"
                style={{
                  backgroundImage: 'url("/login.png")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h2 className="text-xl font-semibold text-cyan-300">Conversations fluides</h2>
                  <p className="mt-2 text-slate-200 text-sm mb-4">
                    Accédez rapidement à vos chats, retrouvez votre historique et continuez la discussion.
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-cyan-500 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>

              <div
                className="flex-1 rounded-3xl border border-slate-700 overflow-hidden bg-cover bg-center relative"
                style={{
                  backgroundImage: 'url("/signup.png")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h2 className="text-xl font-semibold text-cyan-300">Profils personnalisés</h2>
                  <p className="mt-2 text-slate-200 text-sm mb-4">
                    Personnalisez votre photo de profil et démarquez-vous dans vos conversations.
                  </p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Commencer
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default HomePage;
