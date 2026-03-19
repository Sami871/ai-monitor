import Image from "next/image";
import type { SourceMetadata } from "@/types/Analysis";

interface SourceMetadataPanelProps {
  metadata: SourceMetadata;
}

interface MetaRowProps {
  label: string;
  value: string;
}

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-secondary text-xs">{label}</span>
      <span className="text-primary text-xs font-medium text-right truncate max-w-[55%]">
        {value}
      </span>
    </div>
  );
}

export default function SourceMetadataPanel({
  metadata,
}: SourceMetadataPanelProps) {
  return (
    <div className="bg-secondary rounded-xl p-5 flex flex-col gap-4 w-full">
      {/* Header */}
      <h3 className="text-white text-sm font-semibold">Source Metadata</h3>

      {/* Video thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1d23]">
        {metadata.thumbnailUrl ? (
          <Image
            src={metadata.thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#3a3f4b]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-3.5 h-3.5 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
          {metadata.duration}
        </div>
      </div>

      {/* Metadata rows */}
      <div className="divide-y divide-[#2a2d35]">
        <MetaRow label="Filename" value={metadata.filename} />
        <MetaRow label="File Size" value={metadata.fileSize} />
        <MetaRow label="Duration" value={metadata.duration} />
        <MetaRow label="Upload Date" value={metadata.uploadDate} />
      </div>
    </div>
  );
}
