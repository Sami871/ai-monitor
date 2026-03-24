export interface DetectionStats {
  humans: number;
  vehicles: number;
  animals: number;
  birds: number;
}

export interface CameraStatus {
  detectedToday: number;
  lastDetection: string;
  activeTime: string;
}

export interface ObjectDistributionItem {
  label: string;
  percentage: number;
  color: string;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  isLive: boolean;
}

export interface BoundingBox {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}