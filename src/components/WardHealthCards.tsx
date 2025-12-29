"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { wards, getStatusColor } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, MapPin, Activity, ChevronRight } from "lucide-react";

export function WardHealthCards() {
  const criticalWards = [...wards]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 6);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Critical Ward Health</CardTitle>
              <p className="text-sm text-slate-500">Top 6 wards requiring immediate attention</p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1 text-slate-600">
            <Activity className="w-3 h-3" /> Real-time data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {criticalWards.map((ward, index) => {
              const colors = getStatusColor(ward.status);
              const aqiPercent = Math.min((ward.aqi / 500) * 100, 100);
              
              return (
                <Card 
                  key={ward.id} 
                  className="min-w-[280px] border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <CardContent className="p-0">
                    <div 
                      className="h-2 rounded-t-lg"
                      style={{ backgroundColor: colors.hex }}
                    />
                    <div className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                            <Badge className={`${colors.bg} ${colors.text} text-[10px] font-semibold`}>
                              {ward.status}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-slate-900">{ward.id}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {ward.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold" style={{ color: colors.hex }}>{ward.aqi}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">AQI</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Health Index</span>
                          <span className="font-semibold text-slate-700">{Math.round(100 - aqiPercent)}%</span>
                        </div>
                        <Progress 
                          value={100 - aqiPercent} 
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <p className="text-[10px] text-slate-500 uppercase font-bold">PM2.5</p>
                          <p className="font-semibold text-slate-900">{ward.pm25} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <p className="text-[10px] text-slate-500 uppercase font-bold">PM10</p>
                          <p className="font-semibold text-slate-900">{ward.pm10} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 text-xs font-medium ${
                            ward.trend === "up" ? "text-red-600" : 
                            ward.trend === "down" ? "text-emerald-600" : "text-slate-500"
                          }`}>
                            {ward.trend === "up" && <TrendingUp className="w-3 h-3" />}
                            {ward.trend === "down" && <TrendingDown className="w-3 h-3" />}
                            {ward.trend === "stable" && <Minus className="w-3 h-3" />}
                            {ward.trendPercent}%
                          </span>
                          <span className="text-[10px] text-slate-400">24h</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <AlertTriangle className="w-3 h-3" />
                          {ward.signals} signals
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
