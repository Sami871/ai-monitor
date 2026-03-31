import type { UploadStep } from "@/types/upload";
import Image from "next/image";

interface ProgressLoaderProps {
  step: UploadStep;
  progress: number;
}

const STEP_CONFIG: Record<
  "uploading" | "detecting",
  { label: string; title: string; subtitle: string }
> = {
  uploading: {
    label: "Uploading Video",
    title: "Uploading to Server",
    subtitle: "Please wait while we Prepare your video",
  },
  detecting: {
    label: "Analyzing Frame",
    title: "Running Object Detection",
    subtitle:
      "Our AI Model is identifying and Counting objects in your footage.",
  },
};

export default function ProgressLoader({
  step,
  progress,
}: ProgressLoaderProps) {
  if (step !== "uploading" && step !== "detecting") return null;

  const config = STEP_CONFIG[step];

  return (
    <div className="w-full max-w-[860px] mx-auto mt-10 rounded-2xl border-2 border-dashed border-default flex flex-col items-center justify-center gap-8 p-12 min-h-[420px]">
      {/* Video file icon */}
      <div className="shrink-0">
        <Image src="/icons/video-gray.svg" alt="Video" width={120} height={120} />
      </div>

      {/* Progress section */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        {/* Label row */}
        <div className="flex items-center justify-between">
          <span className="text-[#8b909a] text-xs font-medium">
            {config.label}
          </span>
          <span className="text-[#8b909a] text-xs font-medium">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full overflow-hidden bg-[#D9D9D9]">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: "#3B82F6" }}
          />
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-primary text-xl font-semibold">{config.title}</h2>
        <p className="text-secondary text-sm">{config.subtitle}</p>
      </div>
    </div>
  );
}
