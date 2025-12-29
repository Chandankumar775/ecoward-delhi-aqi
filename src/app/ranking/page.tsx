"use client";

import { Nav } from "@/components/Nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, ArrowUp, ArrowDown, Minus, MapPin, Activity, Download, RefreshCcw, Sparkles, ExternalLink, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

interface DelhiLocation {
  rank: number;
  area: string;
  locality: string;
  aqi: number;
  status: string;
  trend: string;
  pm25: number;
  pm10: number;
  lat: number;
  lng: number;
  primarySource: string;
}

const delhiLocations: DelhiLocation[] = [
  { rank: 1, area: "Lodhi Road", locality: "Central Delhi", aqi: 48, status: "Good", trend: "down", pm25: 22, pm10: 38, lat: 28.5918, lng: 77.2273, primarySource: "Low Traffic Zone" },
  { rank: 2, area: "Chanakyapuri", locality: "New Delhi", aqi: 52, status: "Good", trend: "down", pm25: 25, pm10: 42, lat: 28.5921, lng: 77.1791, primarySource: "Diplomatic Area" },
  { rank: 3, area: "Sarojini Nagar", locality: "South Delhi", aqi: 68, status: "Satisfactory", trend: "stable", pm25: 32, pm10: 55, lat: 28.5746, lng: 77.1987, primarySource: "Market Activity" },
  { rank: 4, area: "Vasant Kunj", locality: "South Delhi", aqi: 75, status: "Satisfactory", trend: "down", pm25: 35, pm10: 62, lat: 28.5195, lng: 77.1573, primarySource: "Residential" },
  { rank: 5, area: "Dwarka", locality: "South West Delhi", aqi: 89, status: "Satisfactory", trend: "up", pm25: 42, pm10: 75, lat: 28.5921, lng: 77.0460, primarySource: "Metro Construction" },
  { rank: 6, area: "Rohini", locality: "North Delhi", aqi: 112, status: "Moderate", trend: "up", pm25: 55, pm10: 95, lat: 28.7495, lng: 77.0565, primarySource: "Industrial" },
  { rank: 7, area: "Karol Bagh", locality: "Central Delhi", aqi: 135, status: "Moderate", trend: "stable", pm25: 68, pm10: 112, lat: 28.6514, lng: 77.1907, primarySource: "Traffic Congestion" },
  { rank: 8, area: "Chandni Chowk", locality: "Old Delhi", aqi: 158, status: "Moderate", trend: "up", pm25: 78, pm10: 132, lat: 28.6506, lng: 77.2303, primarySource: "Vehicular + Commercial" },
  { rank: 9, area: "Anand Vihar", locality: "East Delhi", aqi: 245, status: "Very Poor", trend: "up", pm25: 128, pm10: 205, lat: 28.6469, lng: 77.3164, primarySource: "ISBT + Industries" },
  { rank: 10, area: "Jahangirpuri", locality: "North Delhi", aqi: 268, status: "Very Poor", trend: "stable", pm25: 142, pm10: 228, lat: 28.7325, lng: 77.1750, primarySource: "Industrial Waste" },
  { rank: 11, area: "Bawana", locality: "North Delhi", aqi: 312, status: "Severe", trend: "up", pm25: 172, pm10: 275, lat: 28.7976, lng: 77.0513, primarySource: "Industrial Zone" },
  { rank: 12, area: "Mundka", locality: "West Delhi", aqi: 335, status: "Severe", trend: "up", pm25: 185, pm10: 295, lat: 28.6847, lng: 77.0293, primarySource: "Industrial + Burning" },
];

export default function RankingPage() {
  const [selectedLocation, setSelectedLocation] = useState<DelhiLocation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Satisfactory": return "bg-green-100 text-green-700 border-green-200";
      case "Moderate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Poor": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Very Poor": return "bg-red-100 text-red-700 border-red-200";
      case "Severe": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusHex = (status: string) => {
    switch (status) {
      case "Good": return "#10b981";
      case "Satisfactory": return "#22c55e";
      case "Moderate": return "#eab308";
      case "Poor": return "#f97316";
      case "Very Poor": return "#ef4444";
      case "Severe": return "#a855f7";
      default: return "#64748b";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-red-500" />;
      case "down": return <ArrowDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-slate-400" />;
    }
  };

  const openInGoogleMaps = (lat: number, lng: number, name: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(name + ", Delhi")}/@${lat},${lng},15z`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Nav />
      
      <div className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1.5 mb-4">
                <Trophy className="w-3 h-3" /> Live Rankings
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                Delhi Air Quality
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Area Rankings
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Real-time air quality rankings across major Delhi localities. Data sourced from CPCB monitoring stations.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2e5f2d5d-7b4a-45d6-97b2-3038680b7901-1767015522950.png?width=8000&height=8000&resize=contain"
                alt="EcoWard Logo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 -mt-8 relative z-10 max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="font-medium text-slate-700">Delhi NCR Region</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Live Data from CPCB</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Area Performance Rankings
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Ranked by Air Quality Index - Lower is better
                    </CardDescription>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20">
                    12 Areas Monitored
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-20 font-bold text-slate-900">Rank</TableHead>
                      <TableHead className="font-bold text-slate-900">Area</TableHead>
                      <TableHead className="font-bold text-slate-900">AQI</TableHead>
                      <TableHead className="font-bold text-slate-900">Status</TableHead>
                      <TableHead className="font-bold text-slate-900">Trend</TableHead>
                      <TableHead className="font-bold text-slate-900 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {delhiLocations.map((item) => (
                      <TableRow 
                        key={item.rank} 
                        className={`hover:bg-slate-50/80 transition-all cursor-pointer ${selectedLocation?.rank === item.rank ? 'bg-amber-50' : ''}`}
                        onClick={() => setSelectedLocation(item)}
                      >
                        <TableCell className="font-mono">
                          {item.rank <= 3 ? (
                            <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg ${
                              item.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' : 
                              item.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700' : 
                              'bg-gradient-to-br from-amber-600/80 to-amber-700/80 text-white'
                            }`}>
                              {item.rank}
                            </span>
                          ) : (
                            <span className="pl-3 text-slate-500">#{item.rank}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-slate-900">{item.area}</p>
                            <p className="text-xs text-slate-500">{item.locality}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xl font-bold" style={{ color: getStatusHex(item.status) }}>
                            {item.aqi}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(item.status)} font-medium px-2.5 py-0.5 rounded-full border`}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{getTrendIcon(item.trend)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openInGoogleMaps(item.lat, item.lng, item.area);
                            }}
                            className="gap-1 text-slate-500 hover:text-slate-900"
                          >
                            <Navigation className="w-3 h-3" />
                            <span className="hidden sm:inline">Map</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Cleanest Area
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 animate-float">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{delhiLocations[0].area}</h3>
                  <p className="text-slate-500">{delhiLocations[0].locality}</p>
                  <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                    <p className="text-4xl font-bold text-emerald-600">{delhiLocations[0].aqi}</p>
                    <p className="text-sm text-emerald-700">AQI - Good Air Quality</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    Maintained excellent air quality due to green cover and low traffic density
                  </p>
                </div>
              </CardContent>
            </Card>

            {selectedLocation && (
              <Card className="border-0 shadow-xl overflow-hidden animate-slide-up">
                <div className="h-2" style={{ backgroundColor: getStatusHex(selectedLocation.status) }} />
                <CardHeader>
                  <CardTitle className="text-lg">{selectedLocation.area}</CardTitle>
                  <CardDescription>{selectedLocation.locality}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Current AQI</p>
                      <p className="text-2xl font-bold" style={{ color: getStatusHex(selectedLocation.status) }}>
                        {selectedLocation.aqi}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Status</p>
                      <Badge className={`mt-1 ${getStatusColor(selectedLocation.status)}`}>
                        {selectedLocation.status}
                      </Badge>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">PM2.5</p>
                      <p className="text-lg font-bold text-slate-900">{selectedLocation.pm25} <span className="text-xs font-normal">µg/m³</span></p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">PM10</p>
                      <p className="text-lg font-bold text-slate-900">{selectedLocation.pm10} <span className="text-xs font-normal">µg/m³</span></p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-[10px] text-amber-700 uppercase font-bold mb-1">Primary Pollution Source</p>
                    <p className="font-semibold text-amber-900">{selectedLocation.primarySource}</p>
                  </div>

                  <Button 
                    className="w-full gap-2 bg-slate-900 hover:bg-slate-800"
                    onClick={() => openInGoogleMaps(selectedLocation.lat, selectedLocation.lng, selectedLocation.area)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Google Maps
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="map-container rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004883842!2d77.04417355073456!3d28.527280330498815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1703858400000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Click on any area in the table to view details. Use the Map button to open in Google Maps.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Activity className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">Data Source Information</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Air quality data is sourced from the Central Pollution Control Board (CPCB) continuous ambient air quality monitoring stations across Delhi NCR. 
                  Rankings are updated every hour based on real-time AQI readings. Lower AQI indicates better air quality.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">CPCB Data</Badge>
                  <Badge variant="outline" className="text-xs">Hourly Updates</Badge>
                  <Badge variant="outline" className="text-xs">12 Monitoring Stations</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="gradient-hero text-white py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 EcoWard - Delhi Air Quality Monitoring System
          </p>
        </div>
      </footer>
    </div>
  );
}
