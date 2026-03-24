import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  iconColor?: string;
  className?: string;
}

export default function StatCard({
  value,
  label,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-secondary rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-2 min-h-[110px]",
        className
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-white text-3xl font-medium leading-tight">{value}</span>
      <span className="text-secondary text-sm">{label}</span>
    </div>
  );
}