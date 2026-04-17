"use client";

import { DateRangePicker } from "./components/DateRangePicker";
import { Dropdown } from "./components/DropDown";
import ExportButtons from "./components/Exportbuttons";
import ReportsTable from "./components/ReportsTable";
import ReportsPagination from "./components/Reportspagination";
import { useReports } from "@/hooks/useReports";
import { OBJECT_OPTIONS } from "@/data/reports-data";

export default function ReportsPage() {
  const {
    isLoading,
    dateRange,
    currentPage,
    totalPages,
    paginatedData,
    handleDateRangeChange,
    handleObjectChange,
    handlePageChange,
    formatDateTime,
    exportCSV,
    exportExcel,
  } = useReports();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-6 flex-wrap">
          <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />

          <Dropdown
            label="All Objects"
            options={OBJECT_OPTIONS}
            onChange={handleObjectChange}
          />
        </div>

        <ExportButtons onExportCSV={exportCSV} onExportExcel={exportExcel} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-xl">
          <ReportsTable
            isLoading={isLoading}
            rows={paginatedData}
            formatDateTime={formatDateTime}
          />
        </div>

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
