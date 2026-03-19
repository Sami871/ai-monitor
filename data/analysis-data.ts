import type { AnalysisResult } from "@/types/Analysis";

export const DUMMY_ANALYSIS_RESULT: AnalysisResult = {
  stats: [
    {
      id: "humans",
      title: "Humans Detected",
      count: 15,
      confidence: "High",
      confidenceRange: ">90%",
      icon: "human",
      iconColor: "text-[#22c55e]",
    },
    {
      id: "vehicles",
      title: "Vehicles Detected",
      count: 20,
      confidence: "High",
      confidenceRange: ">90%",
      icon: "vehicle",
      iconColor: "text-[#f59e0b]",
    },
    {
      id: "animals",
      title: "Animals Detected",
      count: 6,
      confidence: "High",
      confidenceRange: ">90%",
      icon: "animal",
      iconColor: "text-[#ef4444]",
    },
    {
      id: "birds",
      title: "Birds Detected",
      count: 10,
      confidence: "High",
      confidenceRange: ">60%",
      icon: "bird",
      iconColor: "text-[#a855f7]",
    },
  ],
  detections: [
    {
      type: "Human",
      icon: "human",
      iconColor: "text-[#22c55e]",
      detectionCount: 15,
      avgConfidence: "98.2%",
    },
    {
      type: "Vehicle",
      icon: "vehicle",
      iconColor: "text-[#f59e0b]",
      detectionCount: 20,
      avgConfidence: "94.5%",
    },
    {
      type: "Animal",
      icon: "animal",
      iconColor: "text-[#ef4444]",
      detectionCount: 5,
      avgConfidence: "89.1%",
    },
    {
      type: "Bird",
      icon: "bird",
      iconColor: "text-[#a855f7]",
      detectionCount: 10,
      avgConfidence: "82.4%",
    },
  ],
  metadata: {
    filename: "freepik__animate.mp4",
    fileSize: "449.02 KB",
    duration: "0:04",
    uploadDate: "12/22/2025",
    thumbnailUrl: "/dummy-feed.jpg",
  },
};
