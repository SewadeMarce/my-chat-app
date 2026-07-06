import { useEffect, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { Form, useFetcher } from "react-router";
import { useSocketContext } from "~/hooks/useHook";

function MessageForm() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fecther = useFetcher()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const Socket = useSocketContext()
  useEffect(() => {
    if (fecther.formData) {
      const data = {
        text: fecther.formData.get('text') as string,
        image: fecther.formData.get('image') as string,
      }
      Socket.optimisticMessage(data)
    };
  }, [fecther.formData])
  useEffect(() => {
    if (fecther.data) {
      Socket.onMessage(fecther.data)
      if (Socket.isSoundEnabled) Socket.playRandomKeyStrokeSound();
      setText("");
      setImagePreview("");
    }
  }, [fecther.data])
  return (
    <div className="bg-slate-950/80 border-t border-slate-700/60 p-4 shadow-inner shadow-slate-950/20">
      <div className="max-w-3xl mx-auto space-y-4">
        {imagePreview && (
          <div className="rounded-3xl bg-slate-900/80 border border-slate-700 p-3 flex items-start gap-3">
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-24 h-24 rounded-2xl object-cover border border-slate-700"
            />
            <div className="flex-1">
              <p className="text-slate-200 text-sm font-medium">Aperçu image</p>
              <p className="text-slate-400 text-xs mt-1">Votre image sera envoyée avec le message.</p>
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              aria-label="Supprimer l'image"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        <fecther.Form method="post" className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label htmlFor="message-text" className="sr-only">
            Message
          </label>
          <input
            id="message-text"
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-12 flex-1 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            placeholder="Écrivez votre message..."
          />

          <div className="flex items-center gap-2">
            <input
              type="file"
              name="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <input
              type="text"
              name="image"
              defaultValue={imagePreview as string}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500 hover:text-cyan-300"
              aria-label="Ajouter une image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={!text.trim() && !imagePreview}
              className="inline-flex h-12 items-center justify-center rounded-3xl bg-linear-to-r from-cyan-500 to-cyan-600 px-5 text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-600 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <SendIcon className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Envoyer</span>
            </button>
          </div>
        </fecther.Form>
      </div>
    </div>
  );
}
export default MessageForm;
