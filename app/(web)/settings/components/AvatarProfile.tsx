"use client";

import { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";

const AvatarProfile = () => {
  const { avatarUrl, email, name, setAvatar } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <p className="font-medium text-primary">{name}</p>
        <p className="text-sm text-secondary">{email}</p>
      </div>
    </div>
  );
};

export default AvatarProfile;
