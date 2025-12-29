"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const wardData = [
  { id: "W-01", name: "Central Business Dist.", aqi: 185, status: "Poor", trend: "Increasing", primary: "Vehicular" },
  { id: "W-02", name: "Green Valley Residencies", aqi: 45, status: "Good", trend: "Stable", primary: "None" },
  { id: "W-03", name: "Industrial Estate A", aqi: 310, status: "Severe", trend: "Increasing", primary: "Industrial" },
  { id: "W-04", name: "Heritage Old Town", aqi: 120, status: "Moderate", trend: "Decreasing", primary: "Waste Burning" },
  { id: "W-05", name: "Lakeside North", aqi: 75, status: "Satisfactory", trend: "Stable", primary: "Construction" },
  { id: "W-06", name: "West Port Area", aqi: 240, status: "Very Poor", trend: "Stable", primary: "Marine/Diesel" },
];

export function WardPollutionTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-aqi-good/20 text-aqi-good border-aqi-good/30";
      case "Satisfactory": return "bg-aqi-satisfactory/20 text-slate-700 border-aqi-satisfactory/30";
      case "Moderate": return "bg-aqi-moderate/20 text-aqi-moderate border-aqi-moderate/30";
      case "Poor": return "bg-aqi-poor/20 text-aqi-poor border-aqi-poor/30";
      case "Very Poor": return "bg-aqi-verypoor/20 text-aqi-verypoor border-aqi-verypoor/30";
      case "Severe": return "bg-aqi-severe/20 text-aqi-severe border-aqi-severe/30";
      default: return "";
    }
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-serif font-bold text-gov-blue">Ward-Wise Pollution Status</CardTitle>
          <p className="text-sm text-muted-foreground">Real-time monitoring across 124 municipal wards</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <Download className="w-3.5 h-3.5" /> Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ward by name or ID..." className="pl-9 h-9" />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
        
        <div className="rounded-md border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[100px] font-bold">Ward ID</TableHead>
                <TableHead className="font-bold">Ward Name</TableHead>
                <TableHead className="font-bold">AQI Level</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Primary Source</TableHead>
                <TableHead className="text-right font-bold">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wardData.map((ward) => (
                <TableRow key={ward.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-gov-blue">{ward.id}</TableCell>
                  <TableCell className="font-medium">{ward.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gov-blue" 
                          style={{ width: `${Math.min((ward.aqi / 400) * 100, 100)}%` }} 
                        />
                      </div>
                      <span className="font-bold text-sm">{ward.aqi}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-bold uppercase text-[10px] px-2 py-0.5 ${getStatusColor(ward.status)}`}>
                      {ward.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{ward.primary}</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-xs font-semibold ${ward.trend === 'Increasing' ? 'text-red-500' : ward.trend === 'Decreasing' ? 'text-green-500' : 'text-slate-500'}`}>
                      {ward.trend}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
