"use client";

import GenericVideoUpload from "@/components/web/GenericVideoUpload";
import { videoApi } from "@/lib/api/video.api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PersonsPage() {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
      if (result) {
        router.replace("/persons/result");
      }
    }, [result, router])
  return (
    <div className="flex justify-center w-full">
      <GenericVideoUpload
        dropZoneTitle="Upload Video for Person Counter"
        apiCallback={videoApi.processVideo}
        onSuccess={setResult}
      />
    </div>
  );
}