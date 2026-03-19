"use client";

import { useState, useMemo, useCallback } from "react";
import { DateRange } from "react-day-picker";
import {
  format,
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { REPORTS_DATA, type DetectionRecord } from "@/data/reports-data";

const PAGE_SIZE = 14;

export function useReports() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedObject, setSelectedObject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters
  const filteredData = useMemo<DetectionRecord[]>(() => {
    return REPORTS_DATA.filter((row) => {
      const rowDate = parseISO(row.dateTime);

      // Date range filter
      if (dateRange?.from && dateRange?.to) {
        const inRange = isWithinInterval(rowDate, {
          start: startOfDay(dateRange.from),
          end: endOfDay(dateRange.to),
        });
        if (!inRange) return false;
      }

      // Camera filter
      if (selectedCamera !== "all" && row.cameraName !== selectedCamera) {
        return false;
      }

      // Object filter
      if (selectedObject !== "all" && row.objectType !== selectedObject) {
        return false;
      }

      return true;
    });
  }, [dateRange, selectedCamera, selectedObject]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  // Reset to page 1 on filter change
  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  }, []);

  const handleCameraChange = useCallback((value: string) => {
    setSelectedCamera(value);
    setCurrentPage(1);
  }, []);

  const handleObjectChange = useCallback((value: string) => {
    setSelectedObject(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Format date for display
  const formatDateTime = useCallback((iso: string) => {
    return format(parseISO(iso), "M/d/yyyy, h:mm aa");
  }, []);

  // Build CSV string from filtered data
  const buildCSV = useCallback(
    (data: DetectionRecord[]): string => {
      const headers = ["Date & Time", "Camera Name", "Object Type", "Count"];
      const rows = data.map((r) => [
        formatDateTime(r.dateTime),
        r.cameraName,
        r.objectType,
        r.count.toString(),
      ]);
      return [headers, ...rows]
        .map((r) => r.map((c) => `"${c}"`).join(","))
        .join("\n");
    },
    [formatDateTime],
  );

  // Export as CSV
  const exportCSV = useCallback(() => {
    const csv = buildCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "detection_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, buildCSV]);

  // Export as Excel (.xlsx via CSV with BOM — works in Excel without extra packages)
  const exportExcel = useCallback(() => {
    const csv = buildCSV(filteredData);
    // UTF-8 BOM so Excel opens it correctly
    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "detection_report.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, buildCSV]);

  return {
    // State
    dateRange,
    selectedCamera,
    selectedObject,
    currentPage,
    totalPages,
    // Data
    paginatedData,
    filteredData,
    totalCount: filteredData.length,
    // Handlers
    handleDateRangeChange,
    handleCameraChange,
    handleObjectChange,
    handlePageChange,
    // Utils
    formatDateTime,
    exportCSV,
    exportExcel,
  };
}
