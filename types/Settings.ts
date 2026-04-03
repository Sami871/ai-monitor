export interface SystemSettings {
  detection_humans: boolean;
  detection_vehicle: boolean;
  detection_animals: boolean;
  detection_birds: boolean;
  detection_sensitivity: number;
  count_humans: boolean;
  count_vehicle: boolean;
  count_animals: boolean;
  count_birds: boolean;
  counting_interval: number;
  // Behaviour detection
  behaviour_working: boolean;
  behaviour_sleepy: boolean;
  behaviour_not_available: boolean;
  behaviour_phone: boolean;
  behaviour_sensitivity: number;
  // Person Counter configuration
  roi_direction: "inward_outward" | "inward" | "outward";
  roi_line_position: number;
  roi_sensitivity: number;
}
