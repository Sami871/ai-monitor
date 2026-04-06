"use client";

import Link from "next/link";
import Sidebar from "@/components/web/Sidebar";
import TopHeader from "@/components/web/TopHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfileStore } from "@/store/useProfileStore";

export default function NotFound() {
  const { logout, token } = useAuthStore();
  const { fetchProfilePicture } = useProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchProfilePicture();
    }
  }, [fetchProfilePicture, token]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const NotFoundContent = (
    <div className="flex flex-col items-center justify-center text-center p-6 h-full">
      <h1 className="text-9xl font-bold text-white mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-2xl font-semibold text-primary mb-2">Page Not Found</h2>
      <p className="text-secondary mb-8 max-w-md">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
      </p>
      <Link 
        href="/" 
        className="bg-blue hover:bg-blue/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Back to Monitoring
      </Link>
    </div>
  );

  // Suppress hydration warning on the root element
  if (token) {
    return (
      <div suppressHydrationWarning className="bg-default min-h-screen w-full flex">
        <div className="flex h-screen w-full overflow-hidden relative">
          <Sidebar onLogout={handleLogout} />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-default relative">
            <TopHeader />
            <main className="flex-1 overflow-y-auto bg-default flex justify-center items-center">
              {NotFoundContent}
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="bg-default min-h-screen w-full flex items-center justify-center">
      {NotFoundContent}
    </div>
  );
}
