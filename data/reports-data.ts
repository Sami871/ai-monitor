export type ObjectType = "Human" | "Vehicle" | "Animal" | "Bird";

export interface DetectionRecord {
  id: string;
  dateTime: string; // ISO string — format in UI
  cameraName: string;
  objectType: ObjectType;
  count: number;
}

export const REPORTS_DATA: DetectionRecord[] = [
  {
    id: "1",
    dateTime: "2025-12-18T09:24:00",
    cameraName: "Camera 1",
    objectType: "Human",
    count: 7,
  },
  {
    id: "2",
    dateTime: "2025-12-18T10:57:00",
    cameraName: "Street View",
    objectType: "Vehicle",
    count: 9,
  },
  {
    id: "3",
    dateTime: "2025-12-18T11:32:00",
    cameraName: "Main Camera",
    objectType: "Animal",
    count: 2,
  },
  {
    id: "4",
    dateTime: "2025-12-18T12:45:00",
    cameraName: "Camera 2",
    objectType: "Bird",
    count: 10,
  },
  {
    id: "5",
    dateTime: "2025-12-18T13:17:00",
    cameraName: "Side Lot Cam",
    objectType: "Human",
    count: 3,
  },
  {
    id: "6",
    dateTime: "2025-12-18T14:59:00",
    cameraName: "Back Entrance",
    objectType: "Animal",
    count: 1,
  },
  {
    id: "7",
    dateTime: "2025-12-18T15:41:00",
    cameraName: "Warehouse Cam",
    objectType: "Vehicle",
    count: 5,
  },
  {
    id: "8",
    dateTime: "2025-12-18T16:26:00",
    cameraName: "Camera 4",
    objectType: "Human",
    count: 12,
  },
  {
    id: "9",
    dateTime: "2025-12-18T17:02:00",
    cameraName: "Shipping Dock",
    objectType: "Bird",
    count: 13,
  },
  {
    id: "10",
    dateTime: "2025-12-18T18:18:00",
    cameraName: "Camera 5",
    objectType: "Human",
    count: 11,
  },
  {
    id: "11",
    dateTime: "2025-12-18T19:55:00",
    cameraName: "Garage Camera",
    objectType: "Animal",
    count: 14,
  },
  {
    id: "12",
    dateTime: "2025-12-18T21:11:00",
    cameraName: "Camera 7",
    objectType: "Vehicle",
    count: 16,
  },
  {
    id: "13",
    dateTime: "2025-12-18T22:23:00",
    cameraName: "Camera 8",
    objectType: "Bird",
    count: 17,
  },
  {
    id: "14",
    dateTime: "2025-12-18T20:39:00",
    cameraName: "Camera 6",
    objectType: "Vehicle",
    count: 15,
  },
  {
    id: "15",
    dateTime: "2025-12-19T08:10:00",
    cameraName: "Camera 1",
    objectType: "Human",
    count: 4,
  },
  {
    id: "16",
    dateTime: "2025-12-19T09:45:00",
    cameraName: "Street View",
    objectType: "Animal",
    count: 6,
  },
  {
    id: "17",
    dateTime: "2025-12-19T10:30:00",
    cameraName: "Main Camera",
    objectType: "Vehicle",
    count: 8,
  },
  {
    id: "18",
    dateTime: "2025-12-19T11:15:00",
    cameraName: "Camera 2",
    objectType: "Human",
    count: 9,
  },
  {
    id: "19",
    dateTime: "2025-12-19T13:00:00",
    cameraName: "Side Lot Cam",
    objectType: "Bird",
    count: 3,
  },
  {
    id: "20",
    dateTime: "2025-12-19T14:22:00",
    cameraName: "Back Entrance",
    objectType: "Human",
    count: 5,
  },
  {
    id: "21",
    dateTime: "2025-12-19T15:50:00",
    cameraName: "Warehouse Cam",
    objectType: "Animal",
    count: 7,
  },
  {
    id: "22",
    dateTime: "2025-12-19T17:33:00",
    cameraName: "Camera 4",
    objectType: "Vehicle",
    count: 11,
  },
  {
    id: "23",
    dateTime: "2025-12-19T18:47:00",
    cameraName: "Shipping Dock",
    objectType: "Human",
    count: 2,
  },
  {
    id: "24",
    dateTime: "2025-12-19T20:05:00",
    cameraName: "Camera 5",
    objectType: "Bird",
    count: 8,
  },
  {
    id: "25",
    dateTime: "2025-12-19T21:30:00",
    cameraName: "Garage Camera",
    objectType: "Vehicle",
    count: 13,
  },
  {
    id: "26",
    dateTime: "2025-12-19T22:10:00",
    cameraName: "Camera 7",
    objectType: "Animal",
    count: 9,
  },
  {
    id: "27",
    dateTime: "2025-12-20T09:00:00",
    cameraName: "Camera 8",
    objectType: "Human",
    count: 6,
  },
  {
    id: "28",
    dateTime: "2025-12-20T10:45:00",
    cameraName: "Camera 6",
    objectType: "Bird",
    count: 10,
  },
  {
    id: "29",
    dateTime: "2025-12-20T12:20:00",
    cameraName: "Camera 1",
    objectType: "Animal",
    count: 3,
  },
  {
    id: "30",
    dateTime: "2025-12-20T14:35:00",
    cameraName: "Street View",
    objectType: "Vehicle",
    count: 14,
  },
];

// Derive unique camera names from data for the dropdown
export const CAMERA_OPTIONS = [
  { label: "All Cameras", value: "all" },
  ...Array.from(new Set(REPORTS_DATA.map((r) => r.cameraName))).map((name) => ({
    label: name,
    value: name,
  })),
];

export const OBJECT_OPTIONS = [
  { label: "All Objects", value: "all" },
  { label: "Human", value: "Human" },
  { label: "Vehicle", value: "Vehicle" },
  { label: "Animal", value: "Animal" },
  { label: "Bird", value: "Bird" },
];
