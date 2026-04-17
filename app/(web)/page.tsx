import LiveFeed from "./components/Livefeed";
import RightPanel from "./components/Rightpanel";

export default function LiveMonitoringPage() {
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-6 lg:h-full lg:overflow-hidden">
        <div className="w-full lg:flex-1 aspect-video lg:aspect-auto lg:h-full rounded-xl overflow-hidden shrink-0">
          <LiveFeed />
        </div>

        <div className="w-full lg:w-[421px] lg:h-full lg:overflow-y-auto scrollbar-thin scrollbar-track-transparent shrink-0">
          <RightPanel />
        </div>
      </main>
    </>
  );
}
