import { Users, Car, PawPrint, Bird } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconType = "human" | "vehicle" | "animal" | "bird";

interface DetectionIconProps {
  type: IconType;
  colorClass: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const ICON_MAP: Record<
  IconType,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  human: Users,
  vehicle: Car,
  animal: PawPrint,
  bird: Bird,
};

export default function DetectionIcon({
  type,
  colorClass,
  size = "md",
  className,
}: DetectionIconProps) {
  const Icon = ICON_MAP[type];
  return (
    <Icon
      className={cn(SIZE_MAP[size], colorClass, className)}
      strokeWidth={1.6}
    />
  );
}
