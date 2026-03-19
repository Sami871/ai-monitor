import ObjectTypeBadge from "./Objecttypebadge";
import type { DetectionRecord } from "@/data/reports-data";

interface ReportsTableProps {
  rows: DetectionRecord[];
  formatDateTime: (iso: string) => string;
}

const COL_WIDTHS = {
  dateTime: "",
  cameraName: "",
  objectType: "",
  count: "text-left",
};

export default function ReportsTable({
  rows,
  formatDateTime,
}: ReportsTableProps) {
  return (
    <div className="w-full bg-secondary">
      {/* Table header */}
      <div className="grid grid-cols-[30%_30%_30%_10%] px-4 h-[45px] items-center">
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
          className={`text-primary text-sm font-semibold ${COL_WIDTHS.objectType}`}
        >
          Object Type
        </span>
        <span
          className={`text-primary text-sm font-semibold ${COL_WIDTHS.count}`}
        >
          Count
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
              className="grid grid-cols-[30%_30%_30%_10%] px-4 h-[52px] items-center"
            >
              <span className={`text-secondary text-sm ${COL_WIDTHS.dateTime}`}>
                {formatDateTime(row.dateTime)}
              </span>
              <span
                className={`text-secondary text-sm ${COL_WIDTHS.cameraName}`}
              >
                {row.cameraName}
              </span>
              <span className={COL_WIDTHS.objectType}>
                <ObjectTypeBadge type={row.objectType} />
              </span>
              <span
                className={`justify-start text-secondary text-sm ${COL_WIDTHS.count}`}
              >
                {row.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
