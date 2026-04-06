export default function LoadingReports() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <div className="h-10 w-64 bg-secondary/20 rounded-lg animate-pulse bg-[#151921]/50 border border-default"></div>
          <div className="h-10 w-40 bg-secondary/20 rounded-lg animate-pulse bg-[#151921]/50 border border-default"></div>
          <div className="h-10 w-40 bg-secondary/20 rounded-lg animate-pulse bg-[#151921]/50 border border-default"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-secondary/20 rounded-lg animate-pulse bg-[#151921]/50 border border-default"></div>
          <div className="h-10 w-24 bg-secondary/20 rounded-lg animate-pulse bg-[#151921]/50 border border-default"></div>
        </div>
      </div>
      {/* Table */}
      <div className="h-[500px] w-full rounded-xl bg-secondary/20 animate-pulse bg-[#151921]/50 border border-default"></div>
      {/* Pagination */}
      <div className="h-10 w-full rounded-xl bg-secondary/20 animate-pulse bg-[#151921]/50 border border-default"></div>
    </div>
  );
}
