export default function LoadingBehaviour() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full space-y-6 animate-pulse">
      <div className="w-16 h-16 bg-[#151921]/50 rounded-full border border-default"></div>
      <div className="space-y-3 flex flex-col items-center w-full max-w-md mx-auto">
        <div className="h-8 w-64 bg-[#151921]/50 rounded-lg"></div>
        <div className="h-6 w-full bg-[#151921]/50 rounded-md max-w-md"></div>
        <div className="h-6 w-3/4 bg-[#151921]/50 rounded-md"></div>
      </div>
      <div className="w-56 h-12 bg-secondary/20 rounded-lg mt-4 border border-default"></div>
    </div>
  );
}
