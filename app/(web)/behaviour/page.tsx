"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBehaviourStore } from "@/store/useBehaviourStore";
import GenericVideoUpload from "@/components/web/GenericVideoUpload";
import { videoApi } from "@/lib/api/video.api";

export default function BehaviourPage() {
  const router = useRouter();
  const { result, setResult } = useBehaviourStore();

  useEffect(() => {
    if (result) {
      router.replace("/behaviour/result");
    }
  }, [result, router]);

  if (result) return null;

  return (
    <div className="flex justify-center w-full">
      <GenericVideoUpload
        dropZoneTitle="Upload Video for Behaviour Detection"
        apiCallback={videoApi.processEmployeeSittings}
        onSuccess={setResult}
        redirectRoute="/behaviour/result"
      />
    </div>
  );
}