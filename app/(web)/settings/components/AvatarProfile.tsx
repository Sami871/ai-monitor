"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Pencil, Check, X } from "lucide-react";
import Image from "next/image";
import profile from "@/assets/icon/human.svg";
import { useProfileStore } from "@/store/useProfileStore";

const AvatarProfile = () => {
  const { avatarUrl, name, email, setAvatar, setProfile } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleNameSave = () => {
    if (tempName.trim()) setProfile({ name: tempName.trim() });
    setEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(name);
    setEditingName(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <Avatar
          className="h-[60px] w-[60px] rounded-xl border-3 border-[#3B82F6] cursor-pointer overflow-hidden"
          onClick={openFilePicker}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover absolute inset-0"
            />
          ) : (
            <>
              <AvatarImage asChild>
                <Image src={profile} alt="Profile" className="rounded-xl" />
              </AvatarImage>
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </>
          )}
        </Avatar>

        <button
          type="button"
          onClick={openFilePicker}
          className="absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 
                     h-[18px] w-[18px] rounded-full bg-blue text-white 
                     flex items-center justify-center shadow-md 
                     hover:opacity-90 transition-all duration-150"
        >
          <Pencil size={10} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {/* Editable Name */}
        {editingName ? (
          <div className="flex items-center gap-1">
            <input
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSave();
                if (e.key === "Escape") handleNameCancel();
              }}
              className="text-sm font-medium text-primary bg-transparent border-b border-blue outline-none w-28"
            />
            <button onClick={handleNameSave}>
              <Check size={13} className="text-blue" />
            </button>
            <button onClick={handleNameCancel}>
              <X size={13} className="text-red-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setTempName(name);
              setEditingName(true);
            }}
            className="flex items-center gap-1 group w-fit"
          >
            <p className="font-medium text-primary">{name}</p>
            <Pencil
              size={10}
              className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        )}

        <p className="text-sm text-secondary">{email}</p>
      </div>
    </div>
  );
};

export default AvatarProfile;
