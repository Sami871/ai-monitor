
import LiveFeed from "./components/Livefeed";
import RightPanel from "./components/Rightpanel";

export default function LiveMonitoringPage() {

  return (
        <>
        {/* Content area */}
        <main className="flex flex-1 gap-4 overflow-hidden min-h-0">
          {/* Live feed - takes most of the space */}
          <div className="flex-1 min-w-0 rounded-xl overflow-hidden">
            <LiveFeed />
          </div>

          {/* Right panel - fixed width */}
          <div className="w-[421px] min-w-[421px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#3a3f4b]">
            <RightPanel />
          </div>
        </main>
        </>
        
  );
}