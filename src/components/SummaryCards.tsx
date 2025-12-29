"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Wind, Droplets, TrendingUp, TrendingDown, Minus, Users } from "lucide-react";
import { wards } from "@/lib/data";

export function SummaryCards() {
  const avgAqi = Math.round(wards.reduce((acc, w) => acc + w.aqi, 0) / wards.length);
  const criticalWards = wards.filter(w => w.status === "Severe" || w.status === "Very Poor").length;
  const avgPm25 = Math.round(wards.reduce((acc, w) => acc + w.pm25, 0) / wards.length);
  const totalSignals = wards.reduce((acc, w) => acc + w.signals, 0);

  const cards = [
    {
      title: "Average AQI",
      value: avgAqi,
      subtitle: avgAqi > 200 ? "Very Poor" : avgAqi > 150 ? "Poor" : avgAqi > 100 ? "Moderate" : "Good",
      change: "+5% from yesterday",
      trend: "up" as const,
      icon: <Activity className="w-5 h-5" />,
      gradient: "from-violet-500 to-purple-600",
      lightBg: "bg-violet-50",
      iconBg: "bg-violet-100 text-violet-600",
    },
    {
      title: "Critical Wards",
      value: criticalWards,
      subtitle: "Requires immediate attention",
      change: "2 new since morning",
      trend: "up" as const,
      icon: <AlertTriangle className="w-5 h-5" />,
      gradient: "from-red-500 to-rose-600",
      lightBg: "bg-red-50",
      iconBg: "bg-red-100 text-red-600",
    },
    {
      title: "Avg PM2.5",
      value: avgPm25,
      unit: "µg/m³",
      subtitle: "Particulate matter level",
      change: "-3% from yesterday",
      trend: "down" as const,
      icon: <Wind className="w-5 h-5" />,
      gradient: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-50",
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Citizen Signals",
      value: totalSignals,
      subtitle: "Reports this week",
      change: "18 pending review",
      trend: "stable" as const,
      icon: <Users className="w-5 h-5" />,
      gradient: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-50",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <CardContent className="p-0">
            <div className={`h-1.5 bg-gradient-to-r ${card.gradient}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  {card.icon}
                </div>
                <Badge variant="outline" className={`text-[10px] font-medium gap-1 ${
                  card.trend === "up" ? "text-red-600 border-red-200 bg-red-50" :
                  card.trend === "down" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                  "text-slate-600 border-slate-200 bg-slate-50"
                }`}>
                  {card.trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {card.trend === "down" && <TrendingDown className="w-3 h-3" />}
                  {card.trend === "stable" && <Minus className="w-3 h-3" />}
                  {card.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{card.value}</span>
                  {card.unit && <span className="text-sm text-slate-500 font-medium">{card.unit}</span>}
                </div>
                <p className="text-sm text-slate-500">{card.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
