import { useState, useRef, useEffect } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import {  User } from "~/services/data.service";
import { useNavigate } from "react-router";


function ProfileHeader() {

  const fileInputRef = useRef(null);
  const navigate = useNavigate()
 
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
             // onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={"/avatar.png"}
                alt="Image de profil"
                className="size-full object-cover"
              /> 
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Modifier</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
            /> 
          </div>

          {/* PSEUDO ET STATUT EN LIGNE */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
              {User.authUser?.fullName}
            </h3>

            <p className="text-slate-400 text-xs">En ligne</p>
          </div>
        </div>

        {/* BOUTONS */}
        <div className="flex gap-4 items-center">
          {/* BOUTON DE DÉCONNEXION */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() =>{ User.logout();navigate('/login')}}
          >
            <LogOutIcon className="size-5" />
          </button>

         
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
