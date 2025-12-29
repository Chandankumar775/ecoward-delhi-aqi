"use client";

import { Nav } from "@/components/Nav";
import { SummaryCards } from "@/components/SummaryCards";
import { WardPollutionTable } from "@/components/WardPollutionTable";
import { PollutionSourceChart } from "@/components/PollutionSourceChart";
import { ActionCenter } from "@/components/ActionCenter";
import { PollutionHeatmap } from "@/components/PollutionHeatmap";
import { WardHealthCards } from "@/components/WardHealthCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, MapPin, RefreshCcw, Activity, Wind, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Nav />
      
<div className="gradient-hero text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 order-2 lg:order-1">
                <div className="flex items-center gap-2 text-sm mb-4">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Monitoring Active
                  </Badge>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
                  Ward-Level Air Quality
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Intelligence Dashboard
                  </span>
                </h1>
                
                <p className="text-lg text-slate-300 max-w-xl mb-8">
                  Real-time pollution monitoring across all municipal wards. Track AQI, identify hotspots, and take immediate action for cleaner air.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/grievance">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 gap-2 h-12 px-6">
                      <Wind className="w-5 h-5" /> Report Pollution <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white/20 text-white bg-white/5 hover:bg-white/10 gap-2 h-12 px-6">
                    <Activity className="w-5 h-5" /> View Rankings
                  </Button>
                </div>
              </div>
              
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl" />
                  <img 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/cR7Ee4s6-1-1-1767013381980.jpg?width=8000&height=8000&resize=contain" 
                    alt="Delhi Sarkar"
                    className="relative w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <main className="flex-1 container mx-auto px-4 py-8 -mt-8 relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700">Metropolitan Region</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Last updated: 2 min ago</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:bg-slate-50">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
              <Sparkles className="w-4 h-4" /> Compare Wards
            </Button>
          </div>
        </div>

        <SummaryCards />

        <WardHealthCards />

        <PollutionHeatmap />

        <PollutionSourceChart />

        <WardPollutionTable />

        <ActionCenter />
      </main>

      <footer className="gradient-hero text-white mt-12 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-500">E</span>
              </div>
              <h3 className="font-bold text-xl">EcoWard</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An official initiative by the Municipal Corporation to monitor and manage urban air quality through localized ward-level data analytics and citizen participation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="text-sm space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> National Clean Air Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Environment Protection Act</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Ward Boundary Maps</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Archive Data (Open Data)</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-widest">Transparency</h4>
            <ul className="text-sm space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Sensor Calibration Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Audit & Compliance Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-widest">Contact Support</h4>
            <div className="text-sm text-slate-400 space-y-2">
              <p>Control Room, 4th Floor, Municipal HQ</p>
              <p>Email: aqi.support@municipal.gov</p>
              <p>Toll-Free: 1800-425-CLEAN</p>
            </div>
            <div className="pt-4">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>2025 Municipal Corporation. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Powered by National Informatics Center</span>
            <span>Version 2.4.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
