"use client";

import { useEffect, useRef } from "react";
import { TREND_DATA } from "@/data/dashboard-data";
import type { TrendPoint } from "@/data/dashboard-data";

interface TrendChartProps {
  data?: TrendPoint[];
}

export default function TrendChart({ data = TREND_DATA }: TrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);

  useEffect(() => {
    let chart: { destroy: () => void } | null = null;

    async function init() {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      const ctx = canvasRef.current;
      if (!ctx) return;

      // Destroy previous instance on re-render
      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) => d.time),
          datasets: [
            {
              label: "Humans",
              data: data.map((d) => d.humans),
              borderColor: "#22c55e",
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  300,
                );
                gradient.addColorStop(0, "rgba(34,197,94,0.35)");
                gradient.addColorStop(1, "rgba(34,197,94,0)");
                return gradient;
              },
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 4,
            },
            {
              label: "Vehicles",
              data: data.map((d) => d.vehicles),
              borderColor: "#ef4444",
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  300,
                );
                gradient.addColorStop(0, "rgba(239,68,68,0.3)");
                gradient.addColorStop(1, "rgba(239,68,68,0)");
                return gradient;
              },
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#252830",
              borderColor: "#3a3f4b",
              borderWidth: 1,
              titleColor: "#fff",
              bodyColor: "#8b909a",
              padding: 10,
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: {
                color: "#8b909a",
                font: { size: 11 },
                maxRotation: 0,
              },
              border: { color: "rgba(255,255,255,0.06)" },
            },
          },
        },
      });

      chartRef.current = chart;
    }

    init();

    return () => {
      chart?.destroy();
    };
  }, [data]);

  return (
    <div className="bg-secondary rounded-xl p-5 border border-[#2a6ef5]/40">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-primary text-lg font-medium">
          Detection Trends (24h)
        </h3>
        <p className="text-secondary text-sm mt-2">
          Comparing human and vehicle traffic over the last 24 hours.
        </p>
      </div>

      {/* Canvas */}
      <div className="relative h-[220px] w-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
