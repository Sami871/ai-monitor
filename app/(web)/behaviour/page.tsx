"use client";

import GenericVideoUpload from "@/components/web/GenericVideoUpload";

export default function BehaviourPage() {
  return (
    <div className="flex justify-center w-full">
      <GenericVideoUpload
        dropZoneTitle="Upload Video for Behaviour Detection"
        mockMode={true}
        redirectRoute="/behaviour/result"
      />
    </div>
  );
}