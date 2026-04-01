"use client";

import { useEffect, useRef } from "react";
import { DONUT_SEGMENTS, DONUT_TOTAL } from "@/data/dashboard-data";

export default function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

      const maxVal = Math.max(...DONUT_SEGMENTS.map((s) => s.value));

      chart = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: DONUT_SEGMENTS.map((s) => s.label),
          datasets: [
            {
              data: DONUT_SEGMENTS.map((s) => s.value),
              backgroundColor: DONUT_SEGMENTS.map((s) => s.color),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              display: false,
              min: -maxVal,
            },
          },
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
    <div className="bg-secondary rounded-xl py-6 px-4 md:px-8 border border-default flex flex-row justify-center gap-6 md:gap-[50px] items-center h-[273px]">
      <div className="relative w-[158px] h-[158px] min-w-[158px] min-h-[158px] flex items-center justify-center shrink-0">
        <div className="relative w-full h-full">
          <canvas ref={canvasRef} width={158} height={158} className="w-full h-full" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-[78px] h-[78px] rounded-full bg-secondary flex items-center justify-center z-10">
            <span className="text-white text-[28px] font-semibold">{DONUT_TOTAL}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col justify-center gap-y-4 min-w-[100px]">
        {DONUT_SEGMENTS.map((segment) => (
          <div
            key={segment.label}
            className="flex items-center gap-3"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-[#8b909a] text-[13px]">
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
