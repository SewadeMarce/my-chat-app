import { useEffect,  } from "react";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { User } from "~/services/data.service";
import type { Route } from "./+types/signUp";
import { Form, Link, redirect, useNavigation } from "react-router";
import toast from "react-hot-toast";
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email')
  const fullName = formData.get('fullName')
  const password = formData.get('password')

  await User.signup({ fullName, email, password })
  if (User.authUser) throw redirect("/chat-app");
  return User.erreur
}
function SignUpPage({ actionData }: Route.ComponentProps) {

  const navigation = useNavigation();
  const isSigningUp = navigation.formAction === '/signup';


  useEffect(() => {
    if (actionData) {
      toast.error(actionData)
    }
  }, [actionData])
  return (

    <div className="w-full flex flex-col md:flex-row">
      {/* COLONNE DU FORMULAIRE - PARTIE GAUCHE */}
      <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
        <div className="w-full max-w-md">
          {/* HEADING TEXT */}
          <div className="text-center mb-8">
            <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-200 mb-2">Créer un compte</h2>
            <p className="text-slate-400">Inscrivez-vous pour créer un compte</p>
          </div>

          {/* FORM */}
          <Form method="post" className="space-y-6">
            {/* NOM COMPLET */}
            <div>
              <label className="auth-input-label">Nom complet</label>
              <div className="relative">
                <UserIcon className="auth-input-icon" />

                <input
                  type="text"
                  name="fullName"
                  className="input"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            {/* CHAMP COURRIEL */}
            <div>
              <label className="auth-input-label">Courriel</label>
              <div className="relative">
                <MailIcon className="auth-input-icon" />

                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="jean.dupont@example.com"
                />
              </div>
            </div>

            {/* CHAMP MOT DE PASSE */}
            <div>
              <label className="auth-input-label">Mot de passe</label>
              <div className="relative">
                <LockIcon className="auth-input-icon" />

                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="auth-btn" type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Créer un compte"
              )}
            </button>
          </Form>

          <div className="mt-6 text-center">
            <Link to="/login" className="auth-link">
              Vous avez déjà un compte ? Connectez-vous
            </Link>
          </div>
        </div>
      </div>

      {/* ILLUSTRATION DU FORMULAIRE - CÔTÉ DROIT */}
      <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
        <div>
          <img
            src="/signup.png"
            alt="Personnes utilisant des appareils mobile"
            className="w-full h-auto object-contain"
          />

          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-cyan-400">Commencez dès aujourd'hui</h3>

            <div className="mt-4 flex justify-center gap-4">
              <span className="auth-badge">Gratuit</span>
              <span className="auth-badge">Installation facile</span>
              <span className="auth-badge">Privé</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default SignUpPage;
