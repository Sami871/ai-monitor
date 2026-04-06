export default function LoadingLiveMonitoring() {
  return (
    <div className="flex flex-1 gap-4 overflow-hidden min-h-[calc(100vh-100px)] w-full">
      {/* Live feed skeleton */}
      <div className="flex-1 min-w-0 rounded-xl overflow-hidden bg-secondary/20 animate-pulse border border-default">
        <div className="w-full h-full bg-[#151921]/50"></div>
      </div>
      {/* Right panel skeleton */}
      <div className="w-[421px] min-w-[421px] flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[250px] w-full bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
        ))}
      </div>
    </div>
  );
}
