"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Pencil, Check, X } from "lucide-react";
import Image from "next/image";
import { useProfileStore } from "@/store/useProfileStore";

interface AvatarProfileProps {
  displayName: string;
  onNameChange: (newName: string) => void;
}

const AvatarProfile = ({ displayName, onNameChange }: AvatarProfileProps) => {
  const { avatarUrl, email, setAvatar } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      await setAvatar(file);
    } catch (error) {
    } finally {
      e.target.value = "";
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleNameSave = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
    }
    setEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(displayName);
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
          {avatarUrl && (
            <AvatarImage
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          )}
          <AvatarFallback className="bg-transparent">
            <img 
              src="/assets/icon/human.svg" 
              alt="Profile Default" 
              className="rounded-xl w-full h-full object-cover" 
            />
          </AvatarFallback>
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
              setTempName(displayName);
              setEditingName(true);
            }}
            className="flex items-center gap-1 group w-fit"
          >
            <p className="font-medium text-primary">{displayName}</p>
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
