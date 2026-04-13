"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { DateRange } from "react-day-picker";
import {
  format,
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { dashboardApi } from "@/lib/api/dashboard.api";
import type { DashboardActivity } from "@/types/Dashboard";

const PAGE_SIZE = 14;

export function useReports() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedObject, setSelectedObject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<DashboardActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Using limit=100 so there's enough data for the table,
        // while also matching the user's intent to use the new activity API
        const res = await dashboardApi.getActivity(100);
        setData(res);
      } catch (err: any) {
        console.error("Failed to fetch reports activity", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  const filteredData = useMemo<DashboardActivity[]>(() => {
    return data.filter((row) => {
      if (!row.timestamp) return false;
      const rowDate = parseISO(row.timestamp);

      // Date range filter
      if (dateRange?.from && dateRange?.to) {
        const inRange = isWithinInterval(rowDate, {
          start: startOfDay(dateRange.from),
          end: endOfDay(dateRange.to),
        });
        if (!inRange) return false;
      }

      // Camera filter
      if (selectedCamera !== "all" && row.filename !== selectedCamera) {
        return false;
      }

      // Object filter
      if (selectedObject !== "all" && row.counts) {
        const searchKey = selectedObject.toLowerCase();
        // counts from API usually look like {"animals": 4, "humans": 1}
        const hasObject = Object.keys(row.counts).some(k => k.toLowerCase().includes(searchKey));
        if (!hasObject) return false;
      }

      return true;
    });
  }, [dateRange, selectedCamera, selectedObject, data]);

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
    (records: DashboardActivity[]): string => {
      const headers = ["Date & Time", "Camera Name", "Object Types", "Total Count"];
      const rows = records.map((r) => {
        const typesList = Object.keys(r.counts || {}).join(", ");
        const totalCount = Object.values(r.counts || {}).reduce((sum, val) => sum + val, 0);
        return [
          formatDateTime(r.timestamp),
          r.filename,
          typesList,
          totalCount.toString(),
        ];
      });
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
    isLoading,
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
