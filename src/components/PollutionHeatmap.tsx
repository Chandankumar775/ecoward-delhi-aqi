"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { wards, getStatusColor } from "@/lib/data";
import { MapPin, AlertTriangle, TrendingUp, TrendingDown, Minus, Eye, Filter, Grid3X3 } from "lucide-react";
import { useState } from "react";

export function PollutionHeatmap() {
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredWards = filter === "all" 
    ? wards 
    : wards.filter(w => w.status === filter);

  const maxAqi = Math.max(...wards.map(w => w.aqi));

  const getOpacity = (aqi: number) => {
    return 0.4 + (aqi / maxAqi) * 0.6;
  };

  const getGradientColor = (aqi: number) => {
    if (aqi <= 50) return "#22c55e";
    if (aqi <= 100) return "#84cc16";
    if (aqi <= 150) return "#eab308";
    if (aqi <= 200) return "#f97316";
    if (aqi <= 300) return "#ef4444";
    return "#dc2626";
  };

  const selectedWardData = selectedWard ? wards.find(w => w.id === selectedWard) : null;

  const filters = ["all", "Severe", "Very Poor", "Poor", "Moderate"];

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-100">
              <Grid3X3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Community Pollution Heatmap</CardTitle>
              <p className="text-sm text-slate-500">Ward-wise pollution intensity visualization</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={`text-xs h-8 ${filter === f ? "bg-slate-900" : "hover:bg-slate-50"}`}
              >
                {f === "all" ? "All Wards" : f}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 min-h-[420px]">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Live Grid View</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mt-8">
                {filteredWards.map((ward) => {
                  const isSelected = selectedWard === ward.id;
                  const color = getGradientColor(ward.aqi);
                  
                  return (
                    <button
                      key={ward.id}
                      onClick={() => setSelectedWard(isSelected ? null : ward.id)}
                      className={`relative p-4 rounded-xl transition-all transform ${
                        isSelected 
                          ? "ring-2 ring-slate-900 ring-offset-2 scale-105 z-10 shadow-xl" 
                          : "hover:scale-102 hover:shadow-lg"
                      }`}
                      style={{
                        backgroundColor: color,
                        opacity: getOpacity(ward.aqi),
                      }}
                    >
                      <div className="text-white text-center">
                        <p className="font-bold text-2xl drop-shadow-md">{ward.aqi}</p>
                        <p className="text-[10px] font-semibold opacity-90 drop-shadow">{ward.id}</p>
                      </div>
                      {ward.signals > 20 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                <span className="text-[10px] text-slate-500 font-semibold">Good</span>
                <div className="flex rounded-full overflow-hidden shadow-inner">
                  {["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444", "#dc2626"].map((color, i) => (
                    <div key={i} className="w-10 h-4" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">Severe</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedWardData ? (
              <Card className="border-2 border-slate-900 shadow-lg">
                <CardHeader className="pb-2 bg-slate-900 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="bg-white/20 text-white text-[10px] mb-2">
                        Selected Ward
                      </Badge>
                      <CardTitle className="text-lg">{selectedWardData.name}</CardTitle>
                      <p className="text-slate-300 text-sm">{selectedWardData.id}</p>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: getGradientColor(selectedWardData.aqi) }}
                    >
                      <span className="text-2xl font-bold text-white">{selectedWardData.aqi}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">PM2.5</p>
                      <p className="text-lg font-bold text-slate-900">{selectedWardData.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span></p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">PM10</p>
                      <p className="text-lg font-bold text-slate-900">{selectedWardData.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span></p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">NO2</p>
                      <p className="text-lg font-bold text-slate-900">{selectedWardData.no2} <span className="text-xs font-normal text-slate-400">ppb</span></p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">SO2</p>
                      <p className="text-lg font-bold text-slate-900">{selectedWardData.so2} <span className="text-xs font-normal text-slate-400">ppb</span></p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-[10px] text-amber-700 uppercase font-bold mb-1">Primary Source</p>
                    <p className="font-semibold text-amber-900">{selectedWardData.primarySource}</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">24h Trend</p>
                      <span className={`flex items-center gap-1 font-semibold ${
                        selectedWardData.trend === "up" ? "text-red-600" : 
                        selectedWardData.trend === "down" ? "text-emerald-600" : "text-slate-600"
                      }`}>
                        {selectedWardData.trend === "up" && <TrendingUp className="w-4 h-4" />}
                        {selectedWardData.trend === "down" && <TrendingDown className="w-4 h-4" />}
                        {selectedWardData.trend === "stable" && <Minus className="w-4 h-4" />}
                        {selectedWardData.trendPercent}% {selectedWardData.trend}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Signals</p>
                      <p className="font-semibold text-slate-900">{selectedWardData.signals} reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="font-medium text-slate-600">Select a Ward</p>
                  <p className="text-sm text-slate-400">Click on any ward tile to view detailed metrics</p>
                </div>
              </div>
            )}

            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Critical Zones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {wards
                  .filter(w => w.status === "Severe" || w.status === "Very Poor")
                  .slice(0, 4)
                  .map((ward) => (
                    <button
                      key={ward.id}
                      onClick={() => setSelectedWard(ward.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <div className="text-left">
                          <p className="text-sm font-semibold text-red-900">{ward.id}</p>
                          <p className="text-[10px] text-red-600">{ward.name}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-red-700">{ward.aqi}</span>
                    </button>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
