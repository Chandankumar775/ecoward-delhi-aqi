"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const sourceData = [
  { name: "Vehicular Emissions", value: 35, color: "#003366" },
  { name: "Industrial Activity", value: 25, color: "#C5A059" },
  { name: "Construction Dust", value: 20, color: "#64748b" },
  { name: "Waste Burning", value: 12, color: "#ef4444" },
  { name: "Others", value: 8, color: "#94a3b8" },
];

const trendData = [
  { time: "06:00", aqi: 140 },
  { time: "09:00", aqi: 180 },
  { time: "12:00", aqi: 165 },
  { time: "15:00", aqi: 155 },
  { time: "18:00", aqi: 195 },
  { time: "21:00", aqi: 210 },
  { time: "00:00", aqi: 175 },
];

export function PollutionSourceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-serif font-bold text-gov-blue">Pollution Source Attribution</CardTitle>
          <p className="text-xs text-muted-foreground">Key factors contributing to city-wide PM 2.5 levels</p>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-serif font-bold text-gov-blue">24hr AQI Trend</CardTitle>
          <p className="text-xs text-muted-foreground">Real-time air quality fluctuations over the last 24 hours</p>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="aqi" radius={[4, 4, 0, 0]}>
                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.aqi > 200 ? '#ef4444' : entry.aqi > 150 ? '#f97316' : '#003366'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
