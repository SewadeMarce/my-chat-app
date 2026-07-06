import { useEffect, useRef, useState, type SubmitEventHandler } from "react";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { UseStores } from "~/store/useStore";
import useKeyboardSound from "~/hooks/useKeyboardSound";
import { MessagesService } from "~/services/data.service";
import { Form, useFetcher, useParams } from "react-router";
import { useSocketContext } from "~/hooks/useHook";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const params = useParams()
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const Sokect = useSocketContext()
  const fetcher = useFetcher()
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    MessagesService.sendMessage({
      text: text.trim(),
      image: null,
    }, params.id as string);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  useEffect(() => {
    if (fetcher.formData) {
    
    }
  }, [fetcher.formData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview as string}
              alt="Aperçu"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Form method="post" encType="multipart/form-data" className="max-w-3xl mx-auto flex space-x-4">
        <input
          type="text"
          name="text"
          onChange={(e) => {
            setText(e.target.value);
            Sokect.isSoundEnabled && Sokect.playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
          placeholder="Écrivez votre message..."
        />

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
          value={imagePreview as string}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${imagePreview ? "text-cyan-500" : ""
            }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </Form>
    </div>
  );
}
export default MessageInput;
