import { create } from "zustand";
import type { AnalysisResult } from "@/types/upload";

interface AnalysisStore {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult) => void;
  clearResult: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));
