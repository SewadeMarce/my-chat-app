import { useState } from "react";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Form, Link, redirect, useActionData } from "react-router";
import BorderAnimatedContainer from "~/components/BorderAnimatedContainer";
import { useStateAction } from "~/hooks/useHooks";
import type { Route } from "./+types/login";
import { User } from "~/services/data.service";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();

    const email = formData.get('email')
    const password = formData.get('password')

    await User.login({ email, password })
    if (User.isLoggedIn) {

        throw redirect("/chat-app");
    }
}
function LoginPage() {
    const { loading: isLoggingIn } = useStateAction('/login')
    const [formData, setFormData] = useState({ email: "", password: "" });


    return (

        <div className="w-full flex flex-col md:flex-row">
            {/* COLONNE DU FORMULAIRE - PARTIE GAUCHE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                    {/* HEADING TEXT */}
                    <div className="text-center mb-8">
                        <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-200 mb-2">Bienvenue</h2>
                        <p className="text-slate-400">Connectez-vous pour accéder à votre compte</p>
                    </div>

                    {/* FORM */}
                    <Form method="post" className="space-y-6">
                        {/* CHAMP COURRIEL */}
                        <div>
                            <label className="auth-input-label text-slate-200">Courriel</label>
                            <div className="relative">
                                <MailIcon className="auth-input-icon" />

                                <input
                                    type="email"
                                    value={formData.email}
                                    name="email"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input text-slate-400"
                                    placeholder="jean.dupont@example.com"
                                />
                            </div>
                        </div>

                        {/* CHAMP MOT DE PASSE */}
                        <div>
                            <label className="auth-input-label text-slate-200">Mot de passe</label>
                            <div className="relative">
                                <LockIcon className="auth-input-icon" />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="input text-slate-400"
                                    placeholder="Entrez votre mot de passe"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button className="auth-btn text-white" type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <LoaderIcon className="w-full h-5 animate-spin text-center" />
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </Form>

                    <div className="mt-6 text-center text-slate-200">
                        <Link to="/signup" className="auth-link">
                            Pas encore de compte ? Inscrivez-vous
                        </Link>
                    </div>
                </div>
            </div>

            {/* ILLUSTRATION DU FORMULAIRE - CÔTÉ DROIT */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
                <div>
                    <img
                        src="/login.png"
                        alt="Personnes utilisant des appareils mobile"
                        className="w-full h-auto object-contain"
                    />
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-cyan-400">Connectez-vous où que vous soyez</h3>

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
export default LoginPage;
