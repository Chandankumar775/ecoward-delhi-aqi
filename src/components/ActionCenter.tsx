"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, FileText, Info, Megaphone, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionCenter() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Policy Recommendations */}
      <Card className="xl:col-span-2 shadow-sm border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif font-bold text-gov-blue flex items-center gap-2">
              <FileText className="w-5 h-5 text-gov-gold" /> Mitigation & Policy Recommendations
            </CardTitle>
            <p className="text-sm text-muted-foreground">Data-driven actions for municipal authorities</p>
          </div>
          <Badge className="bg-gov-blue">Active GRAP Stage II</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2 mb-2 text-red-700 font-bold">
                <ShieldAlert className="w-4 h-4" /> Immediate Actions
              </div>
              <ul className="text-sm space-y-2 text-red-900/80 list-disc pl-4">
                <li>Halt construction in Wards W-03 & W-06</li>
                <li>Intensify mechanized road sweeping</li>
                <li>Ban use of coal/firewood in eateries</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold">
                <Info className="w-4 h-4" /> Policy Advisory
              </div>
              <ul className="text-sm space-y-2 text-blue-900/80 list-disc pl-4">
                <li>Implement "Odd-Even" for industrial vehicles</li>
                <li>Subsidize EV chargers in residential wards</li>
                <li>Expansion of green buffer zones in Industrial A</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-muted-foreground italic">Last Updated: 29 Dec 2025, 10:30 AM</span>
            <Button size="sm" className="bg-gov-blue hover:bg-gov-blue/90">
              Download Full Report (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Citizen Health Advisory */}
      <Card className="shadow-sm border-slate-200 bg-slate-50">
        <CardHeader>
          <CardTitle className="text-lg font-serif font-bold text-gov-blue flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-gov-gold" /> Citizen Health Desk
          </CardTitle>
          <p className="text-sm text-muted-foreground">Advisories for current air quality levels</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <p className="text-sm text-slate-700">Wards W-02 & W-05 are safe for outdoor activities.</p>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm text-slate-700">Elderly & children should avoid Ward W-01 during peak hours.</p>
            </div>
            <div className="flex gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-slate-700">N95 masks mandatory in Industrial zones (W-03).</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue/5">
            Report Pollution Incident
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
