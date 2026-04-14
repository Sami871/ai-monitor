import { create } from "zustand";
import type { BehaviourResult } from "@/types/upload";

interface BehaviourStore {
  result: BehaviourResult | null;
  setResult: (result: BehaviourResult) => void;
  clearResult: () => void;
}

export const useBehaviourStore = create<BehaviourStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));
