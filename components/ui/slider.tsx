import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex items-center w-full h-5", className)}>
      {/* Track background */}
      <div className="absolute w-full h-2 rounded-full bg-[#D9D9D9]">
        {/* Filled portion */}
        <div
          className="h-full rounded-full bg-blue transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Native input (invisible, sits on top for interaction) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />

      {/* Custom thumb */}
      <div
        className="absolute w-[18px] h-[18px] rounded-full bg-white border-3 border-[#3B82F6] shadow-md pointer-events-none transition-all duration-100"
        style={{ left: `calc(${percentage}% - 9px)` }}
      />
    </div>
  );
}