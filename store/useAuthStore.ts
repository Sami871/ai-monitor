import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api/auth.api";
import { LoginInput, ForgotPasswordInput } from "@/lib/validations/auth.schema";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
  pendingOtp: string | null;

  login: (data: LoginInput) => Promise<void>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resetPassword: (password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      pendingEmail: null,
      pendingOtp: null,

      login: async (data) => {
        const res = await authApi.login(data);
        const token = res.access_token;

        if (!token) throw new Error("No token received from server");

        localStorage.setItem("access_token", token);
        document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Lax`;

        set({ token, isAuthenticated: true });
      },

      forgotPassword: async (data) => {
        const res = await authApi.forgotPassword(data);
        if (!res) throw new Error("Failed to send OTP");
        set({ pendingEmail: data.email });
      },

      verifyOtp: async (otp) => {
        const email = get().pendingEmail;

        if (!email) throw new Error("No email found");

        const res = await authApi.verifyOtp({ otp, email });
        console.log("Verify OTP response:", res);

        set({ pendingOtp: otp });
      },

      resetPassword: async (password, confirmPassword) => {
        const email = get().pendingEmail;
        const otp = get().pendingOtp;

        console.log("Reset password data:", { email, otp, password });

        if (!email) throw new Error("Session expired. Please try again.");
        if (!otp) throw new Error("OTP not found. Please verify again.");
        if (password !== confirmPassword)
          throw new Error("Passwords do not match");

        await authApi.resetPassword({
          email,
          new_password: password,
        });

        set({ pendingEmail: null, pendingOtp: null });
      },

      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("otp");
        document.cookie = "access_token=; path=/; max-age=0";
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          pendingEmail: null,
          pendingOtp: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        pendingEmail: state.pendingEmail,
        pendingOtp: state.pendingOtp,
      }),
    },
  ),
);
