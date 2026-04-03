import { useState } from "react";
import { Eye, X } from "lucide-react";
import ObjectTypeBadge from "./Objecttypebadge";
import type { DetectionRecord } from "@/data/reports-data";

interface ReportsTableProps {
  rows: DetectionRecord[];
  formatDateTime: (iso: string) => string;
}

const COL_WIDTHS = {
  dateTime: "",
  cameraName: "",
  objectDetails: "text-left",
};

export default function ReportsTable({
  rows,
  formatDateTime,
}: ReportsTableProps) {
  const [selectedRow, setSelectedRow] = useState<DetectionRecord | null>(null);

  const closeModal = () => setSelectedRow(null);

  return (
    <div className="w-full bg-secondary">
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
      {rows.length === 0 ? (
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
                {formatDateTime(row.dateTime)}
              </span>
              <span
                className={`text-secondary text-sm ${COL_WIDTHS.cameraName}`}
              >
                {row.cameraName}
              </span>
              <span className={`relative flex justify-start text-secondary text-sm ${COL_WIDTHS.objectDetails}`}>
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
                        {row.cameraName}
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
                      {["Human", "Vehicle", "Animal", "Bird"].map((type) => {
                        const count =
                          row.objectType === type ? row.count : 0;
                        return (
                          <div
                            key={type}
                            className="flex items-center justify-between"
                          >
                            <ObjectTypeBadge type={type as any} />
                            <span className="text-white text-sm font-medium px-2">
                              {count}
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
