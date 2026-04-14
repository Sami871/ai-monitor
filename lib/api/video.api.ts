import api from "@/lib/axios";
import type { AnalysisResult, BehaviourResult } from "@/types/upload";

export const videoApi = {
  processVideo: async (file: File): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post<AnalysisResult>(
      "/video/process-video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "true",
        },
      },
    );

    return res.data;
  },
  processEmployeeSittings: async (file: File): Promise<BehaviourResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post<BehaviourResult>(
      "/video/process-employee-sittings",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "true",
        },
      },
    );

    return res.data;
  },
};
