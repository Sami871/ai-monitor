export default function Loading() {
  return (
    <div className="bg-default min-h-screen w-full flex items-center justify-center">
      <div className="animate-pulse flex space-x-4">
        <div className="h-12 w-12 bg-secondary rounded-full"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-secondary rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-secondary rounded col-span-2"></div>
              <div className="h-2 bg-secondary rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
