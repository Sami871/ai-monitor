import api from "@/lib/axios";

export const uploadApi = {
  upload: async (data: FormData) => {
    const res = await api.post("/video/upload", data);
    return res.data;
  },
};
