import type { UploadStep } from "@/types/upload";

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
        <svg
          className="w-20 h-20 text-secondary"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M10 11l5 3-5 3v-6z" />
        </svg>
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
