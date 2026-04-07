"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import GenericVideoUpload from "@/components/web/GenericVideoUpload";
import { videoApi } from "@/lib/api/video.api";

export default function VideoAnalysisPage() {
  const router = useRouter();
  const { result, setResult } = useAnalysisStore();

  useEffect(() => {
    if (result) {
      router.replace("/analysis/results");
    }
  }, [result, router]);

  if (result) return null;

  return (
    <div className="flex justify-center w-full">
      <GenericVideoUpload
        dropZoneTitle="Upload Video for Analysis"
        apiCallback={videoApi.processVideo}
        onSuccess={setResult}
        redirectRoute="/analysis/results"
      />
    </div>
  );
}
