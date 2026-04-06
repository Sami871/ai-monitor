export default function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full">
      <div className="w-full max-w-2xl h-[400px] rounded-xl border border-default bg-[#151921]/50 animate-pulse flex flex-col items-center justify-center p-8 gap-6">
        <div className="w-20 h-20 rounded-full bg-secondary/20 border border-default"></div>
        <div className="h-6 w-1/2 bg-secondary/20 rounded-md"></div>
        <div className="h-4 w-3/4 bg-secondary/20 rounded-md"></div>
        <div className="h-12 w-48 bg-secondary/20 rounded-lg mt-4"></div>
      </div>
    </div>
  );
}
