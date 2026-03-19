"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Pencil } from "lucide-react";
import Image from "next/image";
import profile from "@/assets/icon/human.svg";

const AvatarProfile = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
      <div className="relative">
        <Avatar className="h-[60px] w-[60px] rounded-xl border-3 border-[#3B82F6]">
          <AvatarImage asChild>
            <Image src={profile} alt="Profile" />
          </AvatarImage>
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>

        {/* Edit Icon */}
        <button
          type="button"
          className="absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 
                     h-[18px] w-[18px] rounded-full bg-blue text-white 
                     flex items-center justify-center shadow-md 
                     hover:opacity-90 transition-all duration-150"
        >
          <Pencil size={10} />
        </button>
      </div>

      <div>
        <p className="font-medium text-primary">Khan</p>
        <p className="text-sm text-secondary">abc@gmail.com</p>
      </div>
    </div>
  );
};

export default AvatarProfile;
