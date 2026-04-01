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
    subtitle: "Please wait while we prepare your video.",
  },
  detecting: {
    label: "Running AI Detection",
    title: "Running Object Detection",
    subtitle:
      "Our AI model is identifying and counting objects in your footage.",
  },
};

export default function ProgressLoader({
  step,
  progress,
}: ProgressLoaderProps) {
  if (step !== "uploading" && step !== "detecting") return null;

  const config = STEP_CONFIG[step];
  const isDetecting = step === "detecting";

  return (
    <div className="w-full max-w-[860px] mx-auto mt-10 rounded-2xl border-2 border-dashed border-default flex flex-col items-center justify-center gap-8 p-12 min-h-[420px]">
      {/* Icon */}
      <div className="shrink-0">
        <Image
          src="/icons/video-gray.svg"
          alt="Video"
          width={120}
          height={120}
          className={isDetecting ? "animate-pulse" : undefined}
        />
      </div>

      {/* Progress section */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        {/* Label row */}
        <div className="flex items-center justify-between">
          <span className="text-[#8b909a] text-xs font-medium">
            {config.label}
          </span>
          {isDetecting ? (
            /* Processing…*/
            <span className="text-[#8b909a] text-xs font-medium flex items-center gap-1">
              Processing
              <span className="inline-flex gap-0.5">
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                  .
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                  .
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  .
                </span>
              </span>
            </span>
          ) : (
            <span className="text-[#8b909a] text-xs font-medium">
              {progress}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full overflow-hidden bg-[#D9D9D9]">
          {isDetecting ? (
            /* Indeterminate sliding bar */
            <div
              className="h-full rounded-full relative overflow-hidden"
              style={{ backgroundColor: "#1e293b" }}
            >
              <div
                className="absolute inset-y-0 rounded-full"
                style={{
                  width: "45%",
                  backgroundColor: "#3B82F6",
                  animation: "indeterminate-slide 1.6s ease-in-out infinite",
                }}
              />
              <style>{`
                @keyframes indeterminate-slide {
                  0%   { left: -50%; }
                  100% { left: 110%; }
                }
              `}</style>
            </div>
          ) : (
            /* Determinate bar */
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: "#3B82F6" }}
            />
          )}
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
