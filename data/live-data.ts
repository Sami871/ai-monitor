import type {
  DetectionStats,
  CameraStatus,
  ObjectDistributionItem,
  Camera,
  BoundingBox,
  User,
} from "@/types/live";

export const DUMMY_STATS: DetectionStats = {
  humans: 5,
  vehicles: 3,
  animals: 0,
  birds: 0,
};

export const DUMMY_CAMERA_STATUS: CameraStatus = {
  detectedToday: 1284,
  lastDetection: "Just now",
  activeTime: "14h 32m",
};

export const DUMMY_OBJECT_DISTRIBUTION: ObjectDistributionItem[] = [
  { label: "Humans", percentage: 45, color: "#22c55e" },
  { label: "Vehicle", percentage: 35, color: "#f59e0b" },
  { label: "Animals", percentage: 15, color: "#ef4444" },
  { label: "Birds", percentage: 5, color: "#a855f7" },
];

export const DUMMY_CAMERAS: Camera[] = [
  { id: "cam-1", name: "Main Street", location: "Main Street", isLive: true },
  { id: "cam-2", name: "Park Ave", location: "Park Avenue", isLive: true },
  { id: "cam-3", name: "Downtown", location: "Downtown", isLive: false },
  { id: "cam-4", name: "Harbor", location: "Harbor View", isLive: true },
];


export const DUMMY_BOUNDING_BOXES: BoundingBox[] = [
  {
    id: "bb-1",
    label: "vehicle",
    confidence: 99,
    x: 38,
    y: 35,
    width: 14,
    height: 16,
    color: "#f59e0b",
  },
  {
    id: "bb-2",
    label: "vehicle",
    confidence: 99,
    x: 44,
    y: 50,
    width: 20,
    height: 20,
    color: "#f59e0b",
  },
  {
    id: "bb-3",
    label: "Human",
    confidence: 99,
    x: 38,
    y: 68,
    width: 13,
    height: 22,
    color: "#22c55e",
  },
];

export const DUMMY_USER: User = {
  name: "Sam Operator",
  email: "operator@gmail.com",
};