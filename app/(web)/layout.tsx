"use client";

import Sidebar from "@/components/web/Sidebar";
import TopHeader from "@/components/web/TopHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfileStore } from "@/store/useProfileStore";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthStore();
  const { fetchProfilePicture } = useProfileStore();
  const router = useRouter();

  useEffect(() => {
    fetchProfilePicture();
  }, [fetchProfilePicture]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div className="bg-default min-h-screen w-full flex ">
      <div className="flex h-screen w-full overflow-hidden relative">
        <Sidebar onLogout={handleLogout} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-default relative">
          <TopHeader />
          <main className="flex-1 overflow-y-auto bg-default p-6 flex justify-center">
            <div className="w-full h-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
