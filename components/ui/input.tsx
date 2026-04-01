import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-4 py-3 rounded-lg",
        "bg-secondary border border-white",
        "text-primary text-sm placeholder:text-gray-500",
        "outline-none",
        "transition-colors duration-150",
        className,
      )}
    />
  );
}