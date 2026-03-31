import api from "@/lib/axios";
import { LoginInput, ForgotPasswordInput } from "@/lib/validations/auth.schema";

export const authApi = {
  login: async (data: LoginInput) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  forgotPassword: async (
    data: ForgotPasswordInput,
  ): Promise<{ message: string }> => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
  },

  verifyOtp: async (data: {
    otp: string;
    email: string;
  }): Promise<{ message: string }> => {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  },

  resetPassword: async (data: {
    email: string;
    new_password: string;
  }): Promise<{ message: string }> => {
    console.log("Reset password payload:", JSON.stringify(data));
    try {
      const res = await api.post("/auth/reset-password", data);
      return res.data;
    } catch (error: any) {
      console.log("Backend error:", JSON.stringify(error.response?.data));
      throw error;
    }
  },
};
