"use client";

import GenericVideoUpload from "@/components/web/GenericVideoUpload";

export default function PersonsPage() {
  return (
    <div className="flex justify-center w-full">
      <GenericVideoUpload
        dropZoneTitle="Upload Video for Person Counter"
        mockMode={true}
        redirectRoute="/persons/result"
      />
    </div>
  );
}