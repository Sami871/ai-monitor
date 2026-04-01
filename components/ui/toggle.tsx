import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  id,
}: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex items-center h-[26px] w-[48px] rounded-full shrink-0",
        "transition-colors duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1d24]",
        "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
        checked ? "bg-blue" : "bg-[#3a3d47]",
      )}
    >
      <span
        className={cn(
          "inline-block w-[20px] h-[20px] rounded-full bg-white shadow-sm",
          "transform transition-transform duration-200 ease-in-out",
          checked ? "translate-x-[24px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}