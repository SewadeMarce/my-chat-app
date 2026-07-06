import { useState, useRef, useEffect } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { Form, useActionData, useFetcher, useLoaderData, useSubmit } from "react-router";
import toast from "react-hot-toast";



function ProfileHeader(
  {
    onlineUsers,
    isSoundEnabled,
    toggleSound
  }: {
    onlineUsers: string[],
    isSoundEnabled: boolean,
    toggleSound: () => void
  }
) {
  const { user } = useLoaderData();

  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null);
  const fetcher = useFetcher()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      fetcher.submit(
        {
          profilePic: `${base64Image}`,
          condition: 'updateProfile'
        },
        { method: "POST" }
      )
    };
  };
  useEffect(() => {
    if (fetcher.data?.erreur) {toast.error(fetcher.data?.erreur)};
    if (fetcher.data?.success) toast.success(fetcher.data?.success)
  }, [fetcher.data])
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || user?.profilePic || "/avatar.png"}
                alt="Image de profil"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Modifier</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* PSEUDO ET STATUT EN LIGNE */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
              {user?.fullName}
            </h3>

            <p className="text-green-400 text-xs">En ligne</p>

          </div>
        </div>

        {/* BOUTONS */}
        <div className="flex gap-4 items-center">
          {/* BOUTON DE DÉCONNEXION */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => { fetcher.submit({ condition: 'logout' }, { method: "POST" }) }}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* BOUTON DE SON */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // joue un son de clic avant de basculer
              const mouseClickSound = new Audio("/sounds/mouse-click.mp3")
              mouseClickSound && (mouseClickSound.currentTime = 0); // retour au début
              mouseClickSound?.play().catch((error) => console.log("Échec lecture audio :", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
