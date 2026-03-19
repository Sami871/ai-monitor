"use client";

import { useEffect, useRef } from "react";
import { DONUT_SEGMENTS, DONUT_TOTAL } from "@/data/dashboard-data";

export default function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any = null;

    async function init() {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      const ctx = canvasRef.current;
      if (!ctx) return;

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: DONUT_SEGMENTS.map((s) => s.label),
          datasets: [
            {
              data: DONUT_SEGMENTS.map((s) => s.value),
              backgroundColor: DONUT_SEGMENTS.map((s) => s.color),
              borderColor: "#252830",
              borderWidth: 2,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          cutout: "75%",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: "#252830",
              titleColor: "#fff",
              bodyColor: "#8b909a",
              borderColor: "#3a3f4b",
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                label: (context) => ` ${context.label}: ${context.raw}%`,
              },
            },
          },
        },
      });

      chartRef.current = chart;
    }

    init();

    return () => {
      if (chart) {
        chart.destroy();
      }
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="bg-secondary rounded-xl p-5 border border-[#2a6ef5]/40 flex flex-col h-full min-h-[380px]">
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <div className="w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white text-2xl font-bold">{DONUT_TOTAL}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
        {DONUT_SEGMENTS.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <div className="flex flex-col">
              <span className="text-[#8b909a] text-[11px] leading-tight">
                {segment.label}
              </span>
              <span className="text-white text-[13px] font-semibold">
                {segment.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
