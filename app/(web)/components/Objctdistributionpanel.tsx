import type { ObjectDistributionItem } from "@/types/live";

interface ObjectDistributionPanelProps {
  items: ObjectDistributionItem[];
}

export default function ObjectDistributionPanel({
  items,
}: ObjectDistributionPanelProps) {
  return (
    <div className="bg-secondary rounded-xl p-4">
      <h3 className="text-primary font-semibold text-sm mb-6">
        Object Distribution
      </h3>
      <div className="space-y-3.5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-primary text-xs">{item.label}</span>
              <span className="text-secondary text-xs">{item.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#0B0F14] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}