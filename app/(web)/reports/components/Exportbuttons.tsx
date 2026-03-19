import { FileDown } from "lucide-react";

interface ExportButtonsProps {
  onExportCSV: () => void;
  onExportExcel: () => void;
}

export default function ExportButtons({
  onExportCSV,
  onExportExcel,
}: ExportButtonsProps) {
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onExportCSV}
        className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-lg bg-secondary border border-default text-primary text-sm font-medium hover:bg-[#2a2d35] hover:text-white transition-all duration-150 h-[42px]"
      >
        <FileDown className="w-5 h-5" />
        Export CSV
      </button>
      <button
        onClick={onExportExcel}
        className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-lg bg-secondary border border-default text-primary text-sm font-medium hover:bg-[#2a2d35] hover:text-white transition-all duration-150 h-[42px]"
      >
        <FileDown className="w-5 h-5" />
        Export Excel
      </button>
    </div>
  );
}
