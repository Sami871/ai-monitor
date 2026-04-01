"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import VideoUploadFlow from "./components/VideoUploadFlow";

export default function VideoAnalysisPage() {
  const router = useRouter();
  const result = useAnalysisStore((s) => s.result);

  useEffect(() => {
    if (result) {
      router.replace("/analysis/results");
    }
  }, [result, router]);

  if (result) return null;

  return (
    <div className="flex justify-center w-full">
      <VideoUploadFlow />
    </div>
  );
}
