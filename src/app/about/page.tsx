"use client";

import { Nav } from "@/components/Nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Database, 
  ShieldCheck, 
  Coffee,
  Github,
  Linkedin,
  Mail,
  Sparkles
} from "lucide-react";

export default function AboutPage() {
  const developers = [
    {
      name: "Sachit Vashishtha",
      role: "Database Engineer & Data Architect",
      icon: <Database className="w-5 h-5" />,
      coverClass: "book-cover-emerald",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-29-at-6.26.58-PM-1767014384985.jpeg?width=8000&height=8000&resize=contain",
      bio: `Sachit Vashishtha is the mastermind behind all data-related operations in this project. He designed and optimized the spatial database architecture that powers ward-level pollution tracking across all 12 monitored zones. Sachit's deep understanding of geospatial data structures enabled efficient storage and retrieval of location-based citizen signals with sub-millisecond query performance. He implemented the data aggregation pipelines that transform raw sensor inputs into meaningful AQI metrics, PM2.5 levels, and trend calculations displayed on the dashboard. His expertise in database indexing strategies ensured that even with thousands of concurrent citizen reports, the system maintains blazing-fast response times. Sachit also developed the data validation layers that filter out erroneous readings and ensure data integrity.`,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Data Modeling", "Query Optimization", "ETL Pipelines"],
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Ujjwal",
      role: "Quality Assurance & Testing Lead",
      icon: <ShieldCheck className="w-5 h-5" />,
      coverClass: "book-cover-purple",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-29-at-6.13.40-PM-1767014465306.jpeg?width=8000&height=8000&resize=contain",
      bio: `Ujjwal is the guardian of quality for this entire platform, ensuring every feature works flawlessly before reaching end users. He developed a comprehensive testing strategy covering unit tests, integration tests, and end-to-end user journey validations. Ujjwal created over 150 test cases that cover all critical paths including citizen signal submission, government action logging, ward ranking calculations, and real-time heatmap updates. His expertise in automated testing frameworks like Jest and Playwright enabled continuous integration pipelines that catch bugs before they reach production. Ujjwal performed extensive cross-browser testing to ensure the dashboard renders correctly on Chrome, Firefox, Safari, and Edge.`,
      skills: ["Jest", "Playwright", "Cypress", "Load Testing", "Bug Tracking", "CI/CD Testing"],
      bgLight: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      color: "from-purple-500 to-violet-600",
    },
    {
      name: "Chandan Kumar",
      role: "Project Formality Representative",
      icon: <Coffee className="w-5 h-5" />,
      coverClass: "book-cover-slate",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/678c53b952ef4f2e896e6f8d-sexy-anime-hot-girl-poster-canvas-wall-1767014518244.jpg?width=8000&height=8000&resize=contain",
      bio: `Chandan Kumar is officially listed as a team member purely for administrative and formality purposes. To be completely transparent, Chandan did not contribute any actual work to this project. He attended zero meetings, wrote zero lines of code, reviewed zero pull requests, and provided zero design inputs. While other team members worked late nights debugging complex issues and implementing features, Chandan was presumably occupied with other priorities (or perhaps just enjoying chai and snacks). His name appears on the project roster simply because every government project requires a minimum team size for compliance purposes.`,
      skills: ["Attendance (Absent)", "Chai Drinking", "Message Forwarding", "Credit Taking", "Meeting Avoidance"],
      bgLight: "bg-slate-50",
      textColor: "text-slate-500",
      borderColor: "border-slate-200",
      color: "from-slate-400 to-slate-500",
      isJoke: true,
    },
    {
      name: "Jatin Kumar",
      role: "Full Stack Developer & Tech Lead",
      icon: <Code2 className="w-5 h-5" />,
      coverClass: "book-cover-blue",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-29-at-6.15.24-PM-1767014553314.jpeg?width=8000&height=8000&resize=contain",
      bio: `Jatin Kumar serves as the backbone of this entire project, single-handedly architecting both the frontend and backend systems from scratch. With over 4 years of experience in modern web technologies, Jatin designed the responsive React-based dashboard using Next.js 15, implemented the real-time data visualization components using Recharts, and structured the entire codebase following industry best practices. He integrated the GPS-based location services for citizen reporting, built the government action logging system, and created the pollution heatmap visualization that forms the core of this platform. His expertise in TypeScript ensured type-safety across all modules.`,
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs"],
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col">
      <Nav />
      
<div className="relative text-white py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/psycho-pass-shinya-kogami-anime-anime-boys-wallpaper-preview-1767015313661.jpg?width=8000&height=8000&resize=contain')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="bg-white/10 text-white border-white/20 mb-6 px-4 py-1.5 text-sm animate-bounce-slow">
              <Sparkles className="w-4 h-4 mr-2" /> Meet The Team
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              The Brilliant Minds
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mt-2">
                Behind EcoWard
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A dedicated team of developers, engineers, and one formal representative who built this pollution monitoring platform.
            </p>
          </div>
        </div>

      <main className="flex-1 container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-slate-600 dark:text-slate-400">Hover over the cards to reveal the team members</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {developers.map((dev) => (
            <div key={dev.name} className="book-card">
              <div className="book-card-inner">
                <img src={dev.image} alt={dev.name} />
              </div>
              <div className={`book-cover ${dev.coverClass}`}>
                <div className="text-white">{dev.icon}</div>
                <p>{dev.name}</p>
                <span>{dev.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {developers.map((dev, index) => (
            <Card 
              key={dev.name} 
              className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 dark:bg-slate-800 ${
                dev.isJoke ? "opacity-60 hover:opacity-80" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${dev.color}`} />
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dev.color} opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity`} />
              
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dev.color} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl relative">
                      <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${dev.color} flex items-center justify-center shadow-lg`}>
                      <div className="text-white scale-50">{dev.icon}</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{dev.name}</h3>
                    <Badge className={`${dev.bgLight} ${dev.textColor} border ${dev.borderColor} font-medium dark:bg-opacity-20`}>
                      {dev.role}
                    </Badge>
                  </div>
                </div>

                <Separator className="mb-6 dark:bg-slate-700" />

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6 text-justify">
                  {dev.bio}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {dev.isJoke ? "Notable Abilities" : "Technical Skills"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all hover:scale-105 ${
                          dev.isJoke 
                            ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600" 
                            : `${dev.bgLight} ${dev.textColor} ${dev.borderColor} dark:bg-opacity-20`
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {!dev.isJoke && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {dev.isJoke && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-400 italic text-center">
                      "Present in spirit, absent in contribution" - Team Motto for Chandan
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white px-12 py-8">
            <p className="text-lg font-medium mb-2">Built with dedication by Team Orchids</p>
            <p className="text-slate-400 text-sm">EcoWard - Urban Air Quality Intelligence Platform v2.4.1</p>
          </Card>
        </div>
      </main>

      <footer className="gradient-hero text-white py-12 border-t-4 border-amber-500">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-amber-400 font-bold tracking-widest uppercase">EcoWard Intelligence System</p>
          <p className="text-xs text-slate-400">© 2025 EcoWard | Developed by Team Orchids | Government Environment Monitoring Initiative</p>
        </div>
      </footer>
    </div>
  );
}
