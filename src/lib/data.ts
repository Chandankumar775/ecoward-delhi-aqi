export interface Ward {
  id: string;
  name: string;
  aqi: number;
  status: "Good" | "Satisfactory" | "Moderate" | "Poor" | "Very Poor" | "Severe";
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  primarySource: string;
  lat: number;
  lng: number;
  signals: number;
  lastUpdated: string;
}

export interface Signal {
  id: string;
  wardId: string;
  wardName: string;
  type: "construction_dust" | "waste_burning" | "factory_emission" | "water_pollution" | "noise" | "vehicle_emission";
  severity: "low" | "medium" | "high";
  description: string;
  lat: number;
  lng: number;
  timestamp: string;
  status: "new" | "investigating" | "resolved";
  imageUrl?: string;
}

export interface GovAction {
  id: string;
  wardId: string;
  wardName: string;
  actionTags: string[];
  actionDate: string;
  description: string;
  aqiBefore: number;
  aqiAfter: number | null;
  status: "planned" | "in_progress" | "completed";
}

export const wards: Ward[] = [
  { id: "W-01", name: "Central Business District", aqi: 185, status: "Poor", pm25: 92, pm10: 145, no2: 48, so2: 12, trend: "up", trendPercent: 8, primarySource: "Vehicular", lat: 28.6139, lng: 77.2090, signals: 24, lastUpdated: "10 min ago" },
  { id: "W-02", name: "Green Valley Residencies", aqi: 45, status: "Good", pm25: 22, pm10: 38, no2: 18, so2: 5, trend: "down", trendPercent: 12, primarySource: "None", lat: 28.6280, lng: 77.2195, signals: 3, lastUpdated: "5 min ago" },
  { id: "W-03", name: "Industrial Estate A", aqi: 310, status: "Severe", pm25: 168, pm10: 280, no2: 85, so2: 42, trend: "up", trendPercent: 15, primarySource: "Industrial", lat: 28.5921, lng: 77.2485, signals: 67, lastUpdated: "2 min ago" },
  { id: "W-04", name: "Heritage Old Town", aqi: 120, status: "Moderate", pm25: 58, pm10: 95, no2: 32, so2: 15, trend: "down", trendPercent: 5, primarySource: "Waste Burning", lat: 28.6362, lng: 77.2410, signals: 18, lastUpdated: "8 min ago" },
  { id: "W-05", name: "Lakeside North", aqi: 75, status: "Satisfactory", pm25: 35, pm10: 62, no2: 22, so2: 8, trend: "stable", trendPercent: 1, primarySource: "Construction", lat: 28.6508, lng: 77.1855, signals: 8, lastUpdated: "12 min ago" },
  { id: "W-06", name: "West Port Area", aqi: 240, status: "Very Poor", pm25: 125, pm10: 198, no2: 62, so2: 28, trend: "stable", trendPercent: 2, primarySource: "Marine/Diesel", lat: 28.5845, lng: 77.1642, signals: 42, lastUpdated: "3 min ago" },
  { id: "W-07", name: "University Campus", aqi: 62, status: "Satisfactory", pm25: 28, pm10: 52, no2: 20, so2: 6, trend: "down", trendPercent: 8, primarySource: "None", lat: 28.6892, lng: 77.2108, signals: 5, lastUpdated: "15 min ago" },
  { id: "W-08", name: "Market Square Central", aqi: 195, status: "Poor", pm25: 98, pm10: 155, no2: 52, so2: 18, trend: "up", trendPercent: 6, primarySource: "Vehicular", lat: 28.6012, lng: 77.2312, signals: 31, lastUpdated: "4 min ago" },
  { id: "W-09", name: "Tech Park Zone", aqi: 88, status: "Satisfactory", pm25: 42, pm10: 72, no2: 28, so2: 10, trend: "down", trendPercent: 4, primarySource: "Construction", lat: 28.6445, lng: 77.2650, signals: 12, lastUpdated: "7 min ago" },
  { id: "W-10", name: "Railway Junction", aqi: 165, status: "Moderate", pm25: 82, pm10: 132, no2: 45, so2: 16, trend: "up", trendPercent: 3, primarySource: "Diesel", lat: 28.5782, lng: 77.1985, signals: 22, lastUpdated: "6 min ago" },
  { id: "W-11", name: "Riverside Colony", aqi: 52, status: "Good", pm25: 25, pm10: 44, no2: 16, so2: 4, trend: "stable", trendPercent: 1, primarySource: "None", lat: 28.6685, lng: 77.1762, signals: 4, lastUpdated: "18 min ago" },
  { id: "W-12", name: "Industrial Estate B", aqi: 285, status: "Very Poor", pm25: 148, pm10: 245, no2: 78, so2: 38, trend: "down", trendPercent: 7, primarySource: "Industrial", lat: 28.5625, lng: 77.2715, signals: 55, lastUpdated: "1 min ago" },
];

export const signals: Signal[] = [
  { id: "S-001", wardId: "W-03", wardName: "Industrial Estate A", type: "factory_emission", severity: "high", description: "Heavy black smoke from chimney at factory unit 7B", lat: 28.5925, lng: 77.2490, timestamp: "2025-12-29T09:30:00", status: "investigating", imageUrl: "/smoke.jpg" },
  { id: "S-002", wardId: "W-04", wardName: "Heritage Old Town", type: "waste_burning", severity: "medium", description: "Open garbage burning near park entrance", lat: 28.6365, lng: 77.2415, timestamp: "2025-12-29T08:45:00", status: "new" },
  { id: "S-003", wardId: "W-01", wardName: "Central Business District", type: "vehicle_emission", severity: "high", description: "Traffic congestion causing visible smog at intersection", lat: 28.6142, lng: 77.2095, timestamp: "2025-12-29T10:15:00", status: "new" },
  { id: "S-004", wardId: "W-06", wardName: "West Port Area", type: "factory_emission", severity: "high", description: "Chemical smell from port industrial unit", lat: 28.5848, lng: 77.1648, timestamp: "2025-12-29T07:20:00", status: "investigating" },
  { id: "S-005", wardId: "W-05", wardName: "Lakeside North", type: "construction_dust", severity: "low", description: "Dust from road construction site", lat: 28.6512, lng: 77.1860, timestamp: "2025-12-29T11:00:00", status: "resolved" },
  { id: "S-006", wardId: "W-08", wardName: "Market Square Central", type: "waste_burning", severity: "high", description: "Large scale waste burning behind market", lat: 28.6015, lng: 77.2318, timestamp: "2025-12-29T06:30:00", status: "investigating" },
  { id: "S-007", wardId: "W-12", wardName: "Industrial Estate B", type: "factory_emission", severity: "high", description: "Unauthorized emissions from unit 12C", lat: 28.5628, lng: 77.2720, timestamp: "2025-12-29T05:45:00", status: "new" },
  { id: "S-008", wardId: "W-10", wardName: "Railway Junction", type: "vehicle_emission", severity: "medium", description: "Diesel fumes from idling trucks", lat: 28.5785, lng: 77.1990, timestamp: "2025-12-29T09:00:00", status: "new" },
];

export const govActions: GovAction[] = [
  { id: "A-001", wardId: "W-03", wardName: "Industrial Estate A", actionTags: ["inspection", "penalty", "shutdown"], actionDate: "2025-12-28", description: "Issued closure notice to 3 non-compliant factories", aqiBefore: 340, aqiAfter: 310, status: "completed" },
  { id: "A-002", wardId: "W-04", wardName: "Heritage Old Town", actionTags: ["awareness", "fine"], actionDate: "2025-12-27", description: "Anti-burning campaign and spot fines issued", aqiBefore: 145, aqiAfter: 120, status: "completed" },
  { id: "A-003", wardId: "W-01", wardName: "Central Business District", actionTags: ["traffic_control", "green_corridor"], actionDate: "2025-12-29", description: "Implemented odd-even for commercial vehicles", aqiBefore: 185, aqiAfter: null, status: "in_progress" },
  { id: "A-004", wardId: "W-06", wardName: "West Port Area", actionTags: ["inspection", "monitoring"], actionDate: "2025-12-26", description: "Deployed additional air quality monitors at port", aqiBefore: 255, aqiAfter: 240, status: "completed" },
  { id: "A-005", wardId: "W-12", wardName: "Industrial Estate B", actionTags: ["water_spray", "road_cleaning"], actionDate: "2025-12-29", description: "Increased mechanized road sweeping frequency", aqiBefore: 295, aqiAfter: 285, status: "completed" },
  { id: "A-006", wardId: "W-08", wardName: "Market Square Central", actionTags: ["waste_management", "fine"], actionDate: "2025-12-28", description: "Crackdown on illegal waste dumping", aqiBefore: 210, aqiAfter: 195, status: "completed" },
];

export const issueTypes = [
  { value: "construction_dust", label: "Construction Dust", icon: "🏗️" },
  { value: "waste_burning", label: "Waste Burning", icon: "🔥" },
  { value: "factory_emission", label: "Factory Emission", icon: "🏭" },
  { value: "water_pollution", label: "Water Pollution", icon: "💧" },
  { value: "noise", label: "Noise Pollution", icon: "🔊" },
  { value: "vehicle_emission", label: "Vehicle Emission", icon: "🚗" },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Good": return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", hex: "#22c55e" };
    case "Satisfactory": return { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", hex: "#10b981" };
    case "Moderate": return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", hex: "#eab308" };
    case "Poor": return { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", hex: "#f97316" };
    case "Very Poor": return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", hex: "#ef4444" };
    case "Severe": return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", hex: "#a855f7" };
    default: return { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", hex: "#64748b" };
  }
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low": return { bg: "bg-green-100", text: "text-green-700" };
    case "medium": return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "high": return { bg: "bg-red-100", text: "text-red-700" };
    default: return { bg: "bg-slate-100", text: "text-slate-700" };
  }
};

export const getSignalStatusColor = (status: string) => {
  switch (status) {
    case "new": return { bg: "bg-blue-100", text: "text-blue-700" };
    case "investigating": return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "resolved": return { bg: "bg-green-100", text: "text-green-700" };
    default: return { bg: "bg-slate-100", text: "text-slate-700" };
  }
};
