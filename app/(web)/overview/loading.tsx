export default function LoadingOverview() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Cards grid */}
      <div className="grid grid-cols-4 gap-4 w-full">
        {/* 3 standard cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[120px] bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
        ))}
        {/* Compact cards column */}
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-[52px] bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
          ))}
        </div>
      </div>
      {/* Trend Chart */}
      <div className="h-[300px] w-full bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
      
      {/* Recent Activity + Donut */}
      <div className="flex gap-4 flex-col lg:flex-row w-full h-[300px]">
        <div className="w-[65%] h-full bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
        <div className="w-[35%] h-full bg-secondary/20 rounded-xl animate-pulse border border-default bg-[#151921]/50"></div>
      </div>
    </div>
  );
}
