export type ObjectType = "Human" | "Vehicle" | "Animal" | "Bird";

export interface DetectionRecord {
  id: string;
  dateTime: string;
  cameraName: string;
  objectType: ObjectType;
  count: number;
}

export const OBJECT_OPTIONS = [
  { label: "All Objects", value: "all" },
  { label: "Human", value: "Human" },
  { label: "Vehicle", value: "Vehicle" },
  { label: "Animal", value: "Animal" },
  { label: "Bird", value: "Bird" },
  { label: "Sitting", value: "Sitting" },
  { label: "Standing", value: "Standing" },
];
