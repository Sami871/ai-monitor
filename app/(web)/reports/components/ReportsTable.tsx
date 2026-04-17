import { useState } from "react";
import { Eye, X, Loader2 } from "lucide-react";
import ObjectTypeBadge from "./Objecttypebadge";
import type { DashboardActivity } from "@/types/Dashboard";

interface ReportsTableProps {
  isLoading?: boolean;
  rows: DashboardActivity[];
  formatDateTime: (iso: string) => string;
}

const COL_WIDTHS = {
  dateTime: "",
  cameraName: "",
  objectDetails: "text-left",
};

export default function ReportsTable({
  isLoading,
  rows,
  formatDateTime,
}: ReportsTableProps) {
  const [selectedRow, setSelectedRow] = useState<DashboardActivity | null>(
    null,
  );

  const closeModal = () => setSelectedRow(null);

  return (
    <div className="w-full bg-secondary rounded-xl">
      {/* Table header */}
      <div className="grid grid-cols-[40%_40%_20%] px-4 h-[45px] items-center">
        <span
          className={`text-primary text-sm font-semibold ${COL_WIDTHS.dateTime}`}
        >
          Date &amp; Time
        </span>
        <span
          className={`text-primary text-sm font-semibold ${COL_WIDTHS.cameraName}`}
        >
          Camera Name
        </span>
        <span
          className={`text-primary text-sm font-semibold ${COL_WIDTHS.objectDetails}`}
        >
          Object Details
        </span>
      </div>

      {/* Table rows */}
      {isLoading ? (
        <div className="py-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-blue animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="py-16 text-center text-secondary text-sm">
          No records found for the selected filters.
        </div>
      ) : (
        <div className="">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[40%_40%_20%] px-4 h-[52px] items-center hover:bg-white/5 transition-colors border-t border-white/5"
            >
              <span className={`text-secondary text-sm ${COL_WIDTHS.dateTime}`}>
                {formatDateTime(row.timestamp)}
              </span>
              <span
                className={`text-secondary text-sm ${COL_WIDTHS.cameraName}`}
              >
                {row.filename}
              </span>
              <span
                className={`relative flex justify-start text-secondary text-sm ${COL_WIDTHS.objectDetails} ${selectedRow?.id === row.id ? "z-[60]" : ""}`}
              >
                <button
                  onClick={() =>
                    setSelectedRow(selectedRow?.id === row.id ? null : row)
                  }
                  className="text-secondary hover:text-white transition-colors flex items-center justify-center p-1 rounded-md"
                  title="View Object Details"
                >
                  <Eye className="w-5 h-5" />
                </button>

                {/* Popover */}
                {selectedRow?.id === row.id && (
                  <div className="absolute right-4 top-0 z-50 w-64 bg-secondary border border-white/10 rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-secondary">
                      <h3 className="text-white font-medium text-sm">
                        {row.filename}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeModal();
                        }}
                        className="text-secondary hover:text-white bg-transparent hover:bg-white/10 rounded-full p-1 transition-all"
                        aria-label="Close"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      {Object.entries(row.counts || {}).map(([type, count]) => {
                        const mapTypeToBadge = (t: string) => {
                          const lower = t.toLowerCase();
                          if (
                            lower.includes("person") ||
                            lower.includes("human")
                          )
                            return "Human";
                          if (
                            lower.includes("vehicle") ||
                            lower.includes("car") ||
                            lower.includes("truck")
                          )
                            return "Vehicle";
                          if (lower.includes("animal")) return "Animal";
                          if (lower.includes("bird")) return "Bird";
                          // Fallback to capitalize and remove s, or just "Human"
                          return (
                            t.charAt(0).toUpperCase() +
                            t.slice(1).replace(/s$/, "")
                          );
                        };

                        return (
                          <div
                            key={type}
                            className="flex items-center justify-between"
                          >
                            <ObjectTypeBadge
                              type={mapTypeToBadge(type) as any}
                            />
                            <span className="text-white text-sm font-medium px-2">
                              {count as number}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
