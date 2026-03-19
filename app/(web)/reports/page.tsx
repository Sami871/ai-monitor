"use client";

import { DateRangePicker } from "./components/DateRangePicker";
import { Dropdown } from "./components/DropDown";
import ExportButtons from "./components/Exportbuttons";
import ReportsTable from "./components/ReportsTable";
import ReportsPagination from "./components/Reportspagination";
import { useReports } from "@/hooks/useReports";
import { CAMERA_OPTIONS, OBJECT_OPTIONS } from "@/data/reports-data";

export default function ReportsPage() {
  const {
    dateRange,
    currentPage,
    totalPages,
    paginatedData,
    handleDateRangeChange,
    handleCameraChange,
    handleObjectChange,
    handlePageChange,
    formatDateTime,
    exportCSV,
    exportExcel,
  } = useReports();

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: filters */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* Date range — uses your existing component, we wire onChange */}
          <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />

          <Dropdown
            label="All Cameras"
            options={CAMERA_OPTIONS}
            onChange={handleCameraChange}
          />

          <Dropdown
            label="All Objects"
            options={OBJECT_OPTIONS}
            onChange={handleObjectChange}
          />
        </div>

        {/* Right: export buttons */}
        <ExportButtons onExportCSV={exportCSV} onExportExcel={exportExcel} />
      </div>

      {/* ── Table ── */}
      <div className="flex flex-col gap-6">
        <div className="rounded-xl overflow-hidden">
          <ReportsTable rows={paginatedData} formatDateTime={formatDateTime} />
        </div>
        {/* ── Pagination ── */}
        <div className="">
          <ReportsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
