import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api/auth.api";

interface ProfileState {
  avatarUrl: string | null;
  name: string;
  email: string;
  setAvatar: (file: File) => Promise<void>;
  setProfile: (data: { name: string }) => Promise<void>;
  fetchProfilePicture: () => Promise<void>;
  logout: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      avatarUrl: null,
      name: "Khan",
      email: "abc@gmail.com",

      setAvatar: async (file: File) => {
        try {
          const currentAvatar = get().avatarUrl;
          const res = currentAvatar
            ? await authApi.updateProfilePicture(file)
            : await authApi.addProfilePicture(file);

          console.log("Profile picture API response:", res);

          // Dig through the response to find a URL
          let url =
            res.profile_picture ||
            res.profile_picture_url ||
            res.url ||
            res.avatar_url ||
            res.data?.url ||
            res.data?.profile_picture ||
            res.data?.profile_picture_url;

          if (url && typeof url === "string" && url.trim() !== "") {
            if (!url.startsWith("http")) {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
                /\/$/,
                "",
              );
              url = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
            }
            console.log("Setting avatarUrl to:", url);
            set({ avatarUrl: url });
          } else {
            console.warn(
              "No valid URL found in API response. Response keys:",
              Object.keys(res),
            );
          }
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
          throw error;
        }
      },

      setProfile: async (data: { name: string }) => {
        try {
          await authApi.updateProfile(data);
          set((state) => ({ ...state, ...data }));
        } catch (error) {
          console.error("Failed to update profile:", error);
          throw error;
        }
      },

      fetchProfilePicture: async () => {
        try {
          const res = await authApi.getProfilePicture();
          let url =
            res.profile_picture ||
            res.profile_picture_url ||
            res.url ||
            res.avatar_url ||
            res.data?.url ||
            res.data?.profile_picture ||
            res.data?.profile_picture_url;

          if (url && typeof url === "string" && url.trim() !== "") {
            if (!url.startsWith("http")) {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
                /\/$/,
                "",
              );
              url = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
            }
            if (get().avatarUrl !== url) {
              set({ avatarUrl: url });
            }
          }
        } catch (error) {
          console.error("Failed to fetch profile picture:", error);
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout API failed:", error);
        } finally {
          localStorage.removeItem("access_token");
          localStorage.removeItem("profile-storage");
          document.cookie = "access_token=; path=/; max-age=0";
          window.location.href = "/login";
        }
      },
    }),
    { name: "profile-storage" },
  ),
);
