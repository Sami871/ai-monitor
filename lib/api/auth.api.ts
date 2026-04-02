import api from "@/lib/axios";
import {
  LoginInput,
  ForgotPasswordInput,
  ChangePasswordInput,
} from "@/lib/validations/auth.schema";

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

  addProfilePicture: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/auth/add-profile-picture/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateProfilePicture: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.put("/auth/update-profile-picture/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getProfilePicture: async (): Promise<any> => {
    const res = await api.get("/auth/get-profile-picture/");
    return res.data;
  },

  updateProfile: async (data: { name: string }): Promise<any> => {
    const res = await api.patch("/auth/update-profile/", data);
    return res.data;
  },

  changePassword: async (data: ChangePasswordInput): Promise<any> => {
    const res = await api.post("/auth/change-password/", data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout/");
  },
};
