"use client";

import { Nav } from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, FileCheck, Map as MapIcon, ShieldAlert, Settings, Users, Download,
  AlertTriangle, Bell, Search, Plus, TrendingDown, TrendingUp, CheckCircle2,
  Clock, Target, Zap, Activity, Filter, Calendar, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { wards, govActions, signals, getStatusColor, getSeverityColor, getSignalStatusColor, issueTypes } from "@/lib/data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LineChart, Line, Legend } from "recharts";

export default function AuthorityPortal() {
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newActionWard, setNewActionWard] = useState("");
  const [newActionTags, setNewActionTags] = useState<string[]>([]);
  const [newActionDesc, setNewActionDesc] = useState("");

  const stats = [
    { label: "Active Wards Monitored", value: wards.length.toString(), icon: <MapIcon className="w-4 h-4" />, color: "text-blue-600" },
    { label: "Pending Signals", value: signals.filter(s => s.status === "new").length.toString(), icon: <AlertTriangle className="w-4 h-4 text-orange-500" />, color: "text-orange-600" },
    { label: "Actions This Month", value: govActions.length.toString(), icon: <FileCheck className="w-4 h-4" />, color: "text-green-600" },
    { label: "Avg. Impact Score", value: "18%", icon: <TrendingDown className="w-4 h-4 text-green-500" />, color: "text-green-600" },
  ];

  const hotspots = [...wards]
    .sort((a, b) => b.signals - a.signals)
    .slice(0, 6);

  const categoryData = [
    { category: "Construction", count: signals.filter(s => s.type === "construction_dust").length },
    { category: "Waste Burning", count: signals.filter(s => s.type === "waste_burning").length },
    { category: "Factory", count: signals.filter(s => s.type === "factory_emission").length },
    { category: "Vehicle", count: signals.filter(s => s.type === "vehicle_emission").length },
    { category: "Water", count: signals.filter(s => s.type === "water_pollution").length },
    { category: "Noise", count: signals.filter(s => s.type === "noise").length },
  ];

  const impactData = govActions
    .filter(a => a.aqiAfter !== null)
    .map(a => ({
      ward: a.wardId,
      before: a.aqiBefore,
      after: a.aqiAfter || 0,
      improvement: Math.round(((a.aqiBefore - (a.aqiAfter || 0)) / a.aqiBefore) * 100),
    }));

  const filteredSignals = signals.filter(s => 
    (selectedWard === "all" || s.wardId === selectedWard) &&
    (searchQuery === "" || s.description.toLowerCase().includes(searchQuery.toLowerCase()) || s.wardName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const actionTags = ["inspection", "penalty", "shutdown", "awareness", "fine", "traffic_control", "green_corridor", "monitoring", "water_spray", "road_cleaning", "waste_management"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Nav />
      
      <div className="bg-gov-blue text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold">Government Command Center</h2>
              <p className="text-blue-100/70 text-sm">Ward-wise Pollution Intelligence & Action Management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm">
                <Bell className="w-4 h-4 mr-2" /> Alerts
                <span className="ml-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {signals.filter(s => s.status === "new").length}
                </span>
              </Button>
              <Button className="bg-gov-gold hover:bg-gov-gold/90 text-white text-sm">
                <Download className="w-4 h-4 mr-2" /> Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="hotspots" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="hotspots" className="gap-2">
              <Target className="w-4 h-4" /> Hotspot Finder
            </TabsTrigger>
            <TabsTrigger value="actions" className="gap-2">
              <FileCheck className="w-4 h-4" /> Action Logbook
            </TabsTrigger>
            <TabsTrigger value="impact" className="gap-2">
              <Activity className="w-4 h-4" /> Impact Monitor
            </TabsTrigger>
            <TabsTrigger value="signals" className="gap-2">
              <AlertTriangle className="w-4 h-4" /> Citizen Signals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotspots" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-gov-gold" />
                    Wards with Highest Signal Density
                  </CardTitle>
                  <CardDescription>Prioritized by citizen-reported issues in last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {hotspots.map((ward, idx) => {
                      const colors = getStatusColor(ward.status);
                      return (
                        <div key={ward.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            idx === 0 ? "bg-red-500 text-white" : 
                            idx === 1 ? "bg-orange-500 text-white" : 
                            idx === 2 ? "bg-yellow-500 text-white" : "bg-slate-200 text-slate-600"
                          }`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{ward.id}</span>
                              <span className="text-sm text-slate-600">{ward.name}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge className={`${colors.bg} ${colors.text} text-[10px]`}>{ward.status}</Badge>
                              <span className="text-xs text-slate-500">Primary: {ward.primarySource}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gov-blue">{ward.signals}</p>
                            <p className="text-[10px] text-muted-foreground">signals</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: colors.hex }}>{ward.aqi}</p>
                            <p className="text-[10px] text-muted-foreground">AQI</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gov-gold" />
                    Category Clustering
                  </CardTitle>
                  <CardDescription>Signal distribution by pollution type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" fontSize={10} />
                        <YAxis type="category" dataKey="category" fontSize={10} width={80} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#003366" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-gov-gold" />
                      Action Timeline
                    </CardTitle>
                    <CardDescription>Government interventions and mitigation actions</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gov-blue">
                    <Plus className="w-4 h-4 mr-1" /> Log Action
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {govActions.map((action) => (
                      <div key={action.id} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-l-transparent">
                        <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-2 border-white ${
                          action.status === "completed" ? "bg-green-500" : 
                          action.status === "in_progress" ? "bg-yellow-500" : "bg-slate-300"
                        }`} />
                        
                        <div className="bg-white p-4 rounded-lg border hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="font-bold text-gov-blue">{action.wardId}</span>
                              <span className="text-slate-500 mx-2">•</span>
                              <span className="text-sm text-slate-600">{action.wardName}</span>
                            </div>
                            <Badge variant={action.status === "completed" ? "default" : "secondary"} className={
                              action.status === "completed" ? "bg-green-100 text-green-700" :
                              action.status === "in_progress" ? "bg-yellow-100 text-yellow-700" : ""
                            }>
                              {action.status.replace("_", " ")}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-slate-700 mb-3">{action.description}</p>
                          
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            {action.actionTags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px] bg-slate-50">
                                {tag.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {action.actionDate}
                            </div>
                            {action.aqiAfter !== null && (
                              <div className="flex items-center gap-2">
                                <span>AQI: {action.aqiBefore}</span>
                                <ArrowRight className="w-3 h-3" />
                                <span className="text-green-600 font-bold">{action.aqiAfter}</span>
                                <span className="text-green-600">(-{Math.round(((action.aqiBefore - action.aqiAfter) / action.aqiBefore) * 100)}%)</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Log Action</CardTitle>
                  <CardDescription>Record new government intervention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Ward</label>
                    <Select value={newActionWard} onValueChange={setNewActionWard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {ward.id} - {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Action Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {actionTags.slice(0, 6).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setNewActionTags(prev => 
                            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                          )}
                          className={`px-2 py-1 text-xs rounded-full border transition-all ${
                            newActionTags.includes(tag)
                              ? "bg-gov-blue text-white border-gov-blue"
                              : "bg-white text-slate-600 border-slate-200 hover:border-gov-blue"
                          }`}
                        >
                          {tag.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={newActionDesc}
                      onChange={(e) => setNewActionDesc(e.target.value)}
                      placeholder="Describe the action taken..."
                      className="w-full p-2 border rounded-md text-sm min-h-[80px]"
                    />
                  </div>

                  <Button className="w-full bg-gov-blue">
                    <Plus className="w-4 h-4 mr-2" /> Log Action
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-gov-gold" />
                    Before vs After AQI Comparison
                  </CardTitle>
                  <CardDescription>Measuring impact of government actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="ward" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="before" name="Before Action" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="after" name="After Action" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-500" />
                    Action Success Index
                  </CardTitle>
                  <CardDescription>Improvement percentage by ward</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {impactData.map((item) => (
                      <div key={item.ward} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{item.ward}</span>
                          <span className="text-green-600 font-bold">{item.improvement}% improvement</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                            style={{ width: `${Math.min(item.improvement * 2, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Before: {item.before} AQI</span>
                          <span>After: {item.after} AQI</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gov-gold" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-800">Success Pattern</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Factory shutdowns in Industrial zones reduced PM2.5 by <strong>22%</strong> within 7 days.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span className="font-bold text-orange-800">Pattern Alert</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Waste burning complaints peak between <strong>6 PM - 9 PM</strong> in Ward W-04 and W-08.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-blue-800">Recommendation</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Focus patrols on <strong>W-03, W-06, W-12</strong> - highest signal density this week.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="signals" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-gov-gold" />
                      Citizen Signal Feed
                    </CardTitle>
                    <CardDescription>Real-time pollution reports from citizens</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search signals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Select value={selectedWard} onValueChange={setSelectedWard}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Wards</SelectItem>
                        {wards.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>{ward.id}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredSignals.map((signal) => {
                    const sevColors = getSeverityColor(signal.severity);
                    const statusColors = getSignalStatusColor(signal.status);
                    const issueType = issueTypes.find(t => t.value === signal.type);
                    
                    return (
                      <div key={signal.id} className="p-4 border rounded-lg hover:border-gov-blue/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{issueType?.icon}</span>
                            <div>
                              <p className="font-bold text-sm">{issueType?.label}</p>
                              <p className="text-xs text-muted-foreground">{signal.wardId} - {signal.wardName}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`${sevColors.bg} ${sevColors.text} text-[10px]`}>
                              {signal.severity}
                            </Badge>
                            <Badge className={`${statusColors.bg} ${statusColors.text} text-[10px]`}>
                              {signal.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{signal.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(signal.timestamp).toLocaleString()}
                          </span>
                          <span className="font-mono">{signal.lat.toFixed(4)}, {signal.lng.toFixed(4)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
