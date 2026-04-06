export default function LoadingSettings() {
  return (
    <div className="w-full flex-col flex gap-6" style={{ maxWidth: "652px" }}>
      {/* Avatar Profile Section */}
      <div className="p-6 rounded-xl border border-default bg-[#151921]/50 animate-pulse flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-secondary/20"></div>
        <div className="space-y-3 flex-1">
          <div className="h-6 w-1/3 bg-secondary/20 rounded-md"></div>
          <div className="h-10 w-full bg-secondary/20 rounded-lg"></div>
        </div>
      </div>
      
      {/* Password Section */}
      <div className="p-6 rounded-xl border border-default bg-[#151921]/50 animate-pulse space-y-6">
        <div className="h-6 w-1/4 bg-secondary/20 rounded-md"></div>
        <div className="space-y-4">
          <div className="h-10 w-full bg-secondary/20 rounded-lg"></div>
          <div className="h-10 w-full bg-secondary/20 rounded-lg"></div>
          <div className="h-10 w-full bg-secondary/20 rounded-lg"></div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end pt-2">
        <div className="w-[205px] h-[52px] bg-secondary/20 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
