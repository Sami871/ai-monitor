import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  avatarUrl: string | null;
  name: string;
  email: string;
  setAvatar: (url: string) => Promise<void>;
  setProfile: (
    data: Partial<Pick<ProfileState, "name" | "email">>,
  ) => Promise<void>;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      avatarUrl: null,
      name: "Khan",
      email: "abc@gmail.com",

      // Swap body for API call when backend is ready:
      // await fetch("/api/profile/avatar", { method: "PUT", body: formData });
      setAvatar: async (url: string) => {
        set({ avatarUrl: url });
      },

      // Swap body for API call when backend is ready:
      // await fetch("/api/profile", { method: "PATCH", body: JSON.stringify(data) });
      setProfile: async (data) => {
        set((state) => ({ ...state, ...data }));
      },
    }),
    { name: "profile-storage" }, // persists to localStorage
  ),
);
