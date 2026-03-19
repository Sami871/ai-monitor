import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ReportsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReportsPaginationProps) {
  // Build page numbers to show: always show first, last, current ±1, with ellipsis
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-[30px] h-[30px] mr-5 flex items-center justify-center rounded-lg bg-secondary transition-all duration-150",
          currentPage === 1
            ? "text-secondary cursor-not-allowed"
            : "text-primary hover:bg-secondary hover:text-primary",
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-[30px] h-[30px] flex items-center justify-center text-secondary text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "w-[30px] h-[30px] mr-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150",
              currentPage === page
                ? "bg-blue text-primary"
                : "text-secondary bg-secondary hover:text-primary",
            )}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-[30px] h-[30px] ml-3 flex items-center justify-center rounded-lg bg-secondary transition-all duration-150",
          currentPage === totalPages
            ? "text-secondary cursor-not-allowed"
            : "text-primary hover:bg-[#252830] hover:text-white",
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
