"use client";

import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  AlertCircle, CheckCircle2, Send, MapPin, Clock, 
  Camera, Loader2, Navigation, FileImage, X, Eye, Search,
  Sparkles, ArrowRight, Shield, Zap, History, MapPinned,
  Building, Factory, Flame, Droplets, Volume2, Car, Info
} from "lucide-react";
import { useState, useRef } from "react";

type SignalType = "construction_dust" | "waste_burning" | "factory_emission" | "water_pollution" | "noise" | "vehicular";
type Severity = "low" | "medium" | "high";

interface SignalReport {
  id: string;
  ward_no: number;
  ward_name: string;
  lat: number;
  lng: number;
  signal_type: SignalType;
  intensity: Severity;
  description: string;
  image_url?: string;
  timestamp: Date;
  status: "submitted" | "under_review" | "action_taken" | "resolved";
}

const signalTypes: { value: SignalType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "construction_dust", label: "Construction Dust", icon: <Building className="w-5 h-5" />, color: "from-orange-500 to-amber-500" },
  { value: "waste_burning", label: "Waste Burning", icon: <Flame className="w-5 h-5" />, color: "from-red-500 to-orange-500" },
  { value: "factory_emission", label: "Factory Emission", icon: <Factory className="w-5 h-5" />, color: "from-slate-600 to-slate-700" },
  { value: "water_pollution", label: "Water Pollution", icon: <Droplets className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
  { value: "noise", label: "Noise Pollution", icon: <Volume2 className="w-5 h-5" />, color: "from-purple-500 to-violet-500" },
  { value: "vehicular", label: "Vehicular Emission", icon: <Car className="w-5 h-5" />, color: "from-emerald-500 to-teal-500" },
];

const severityLevels: { value: Severity; label: string; color: string; bgColor: string; description: string }[] = [
  { value: "low", label: "Low", color: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-200 hover:border-emerald-400", description: "Minor impact" },
  { value: "medium", label: "Medium", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200 hover:border-amber-400", description: "Moderate concern" },
  { value: "high", label: "High", color: "text-red-700", bgColor: "bg-red-50 border-red-200 hover:border-red-400", description: "Urgent attention" },
];

const mockReports: SignalReport[] = [
  {
    id: "SIG-2025-001",
    ward_no: 12,
    ward_name: "Civic Center",
    lat: 28.6139,
    lng: 77.2090,
    signal_type: "construction_dust",
    intensity: "high",
    description: "Heavy dust from construction site near main road",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "under_review",
  },
  {
    id: "SIG-2025-002",
    ward_no: 5,
    ward_name: "Garden Area",
    lat: 28.6200,
    lng: 77.2100,
    signal_type: "waste_burning",
    intensity: "medium",
    description: "Open waste burning observed in evening hours",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "action_taken",
  },
  {
    id: "SIG-2025-003",
    ward_no: 22,
    ward_name: "Industrial Zone A",
    lat: 28.6300,
    lng: 77.2200,
    signal_type: "factory_emission",
    intensity: "high",
    description: "Black smoke from factory chimney",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    status: "resolved",
  },
];

export default function GrievancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedWard, setDetectedWard] = useState<{ name: string; id: number } | null>(null);
  const [selectedType, setSelectedType] = useState<SignalType | "">("");
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "">("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [myReports, setMyReports] = useState<SignalReport[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedSteps = [
    location !== null,
    selectedType !== "",
    selectedSeverity !== "",
    description.length > 0,
  ].filter(Boolean).length;

  const getLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          setDetectedWard({ name: "Civic Center", id: 12 });
          setIsLocating(false);
        },
        () => {
          setLocation({ lat: 28.6139, lng: 77.2090 });
          setDetectedWard({ name: "Civic Center", id: 12 });
          setIsLocating(false);
        }
      );
    } else {
      setLocation({ lat: 28.6139, lng: 77.2090 });
      setDetectedWard({ name: "Civic Center", id: 12 });
      setIsLocating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SIG-2025-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
    setSubmittedId(newId);
    
    const newReport: SignalReport = {
      id: newId,
      ward_no: detectedWard?.id || 12,
      ward_name: detectedWard?.name || "Unknown",
      lat: location?.lat || 0,
      lng: location?.lng || 0,
      signal_type: selectedType as SignalType,
      intensity: selectedSeverity as Severity,
      description,
      image_url: imagePreview || undefined,
      timestamp: new Date(),
      status: "submitted",
    };
    
    setMyReports([newReport, ...myReports]);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setLocation(null);
    setDetectedWard(null);
    setSelectedType("");
    setSelectedSeverity("");
    setImagePreview(null);
    setDescription("");
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "submitted":
        return { label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Send className="w-3 h-3" /> };
      case "under_review":
        return { label: "Under Review", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Eye className="w-3 h-3" /> };
      case "action_taken":
        return { label: "Action Taken", color: "bg-purple-100 text-purple-700 border-purple-200", icon: <Zap className="w-3 h-3" /> };
      case "resolved":
        return { label: "Resolved", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> };
      default:
        return { label: "Unknown", color: "bg-slate-100 text-slate-700", icon: null };
    }
  };

  const filteredReports = myReports.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ward_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.signal_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Nav />
      
<div className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <Badge className="bg-white/10 text-white border-white/20 mb-4">
                  <Sparkles className="w-3 h-3 mr-1" /> Citizen Empowerment Initiative
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                  Report Pollution Incidents
                </h1>
                <p className="text-lg text-slate-300 max-w-xl">
                  Help us build cleaner wards. Your GPS-verified reports directly reach municipal authorities for immediate action.
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

      <main className="flex-1 container mx-auto px-4 py-8 -mt-8 relative z-10 max-w-5xl">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 h-12 p-1 bg-white shadow-lg rounded-xl border">
            <TabsTrigger value="report" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white gap-2 font-medium">
              <Send className="w-4 h-4" /> Report Signal
            </TabsTrigger>
            <TabsTrigger value="track" className="rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-white gap-2 font-medium">
              <History className="w-4 h-4" /> Track Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="mt-0">
            {submitted ? (
              <Card className="max-w-2xl mx-auto border-0 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Signal Submitted Successfully!</h2>
                  <p className="text-emerald-100">Your report has been registered and sent to authorities</p>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500">Reference ID:</span>
                    <code className="text-lg font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border">{submittedId}</code>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Ward</p>
                      <p className="font-semibold text-slate-900">Ward {detectedWard?.id} - {detectedWard?.name}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Issue Type</p>
                      <p className="font-semibold text-slate-900">{signalTypes.find(s => s.value === selectedType)?.label}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Severity</p>
                      <Badge className={severityLevels.find(s => s.value === selectedSeverity)?.bgColor}>
                        {severityLevels.find(s => s.value === selectedSeverity)?.label}
                      </Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">GPS Location</p>
                      <p className="font-mono text-sm text-slate-700">{location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</p>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">What happens next?</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      Our inspection team will investigate the reported site within 48 working hours. Track progress in the "Track Reports" tab.
                    </AlertDescription>
                  </Alert>

                  <Button onClick={resetForm} className="w-full h-12 bg-slate-900 hover:bg-slate-800">
                    Submit Another Report
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto border-0 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        New Signal Report
                      </CardTitle>
                      <CardDescription className="mt-1">GPS-verified pollution incident reporting</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(completedSteps / 4) * 100} className="w-24 h-2" />
                        <span className="text-sm font-medium">{completedSteps}/4</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${location ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                          {location ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                        </div>
                        <Label className="text-base font-semibold">Capture Your Location</Label>
                      </div>
                      <div className={`ml-4 pl-7 border-l-2 ${location ? "border-emerald-200" : "border-slate-200"}`}>
                        {location ? (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-700">
                              <MapPinned className="w-5 h-5" />
                              <span className="font-semibold">Location Verified</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Coordinates</p>
                                <p className="font-mono text-sm">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Detected Ward</p>
                                <p className="font-semibold text-slate-900">Ward {detectedWard?.id} - {detectedWard?.name}</p>
                              </div>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={getLocation} className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100">
                              <Navigation className="w-4 h-4 mr-2" /> Re-capture Location
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-slate-300 transition-colors">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <MapPin className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 mb-4">Allow location access to auto-detect your ward</p>
                            <Button type="button" onClick={getLocation} disabled={isLocating} className="bg-slate-900 hover:bg-slate-800">
                              {isLocating ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Detecting...
                                </>
                              ) : (
                                <>
                                  <Navigation className="w-4 h-4 mr-2" /> Enable Location
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedType ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                          {selectedType ? <CheckCircle2 className="w-4 h-4" /> : "2"}
                        </div>
                        <Label className="text-base font-semibold">Select Issue Type</Label>
                      </div>
                      <div className={`ml-4 pl-7 border-l-2 ${selectedType ? "border-emerald-200" : "border-slate-200"}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <TooltipProvider>
                            {signalTypes.map((type) => (
                              <Tooltip key={type.value}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedType(type.value)}
                                    className={`relative p-4 rounded-xl border-2 text-left transition-all group ${
                                      selectedType === type.value
                                        ? "border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]"
                                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                                    }`}
                                  >
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-3`}>
                                      {type.icon}
                                    </div>
                                    <p className="text-sm font-semibold">{type.label}</p>
                                    {selectedType === type.value && (
                                      <div className="absolute top-2 right-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                      </div>
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Report {type.label.toLowerCase()} incidents</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selectedSeverity ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                          {selectedSeverity ? <CheckCircle2 className="w-4 h-4" /> : "3"}
                        </div>
                        <Label className="text-base font-semibold">Rate Severity Level</Label>
                      </div>
                      <div className={`ml-4 pl-7 border-l-2 ${selectedSeverity ? "border-emerald-200" : "border-slate-200"}`}>
                        <div className="grid grid-cols-3 gap-3">
                          {severityLevels.map((level) => (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => setSelectedSeverity(level.value)}
                              className={`p-4 rounded-xl border-2 text-center transition-all ${
                                selectedSeverity === level.value
                                  ? `${level.bgColor} border-current scale-[1.02] shadow-md`
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              <p className={`font-bold text-lg ${selectedSeverity === level.value ? level.color : "text-slate-900"}`}>
                                {level.label}
                              </p>
                              <p className={`text-xs ${selectedSeverity === level.value ? level.color : "text-slate-500"}`}>
                                {level.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-slate-200 text-slate-600">
                          4
                        </div>
                        <Label className="text-base font-semibold">Add Details & Evidence</Label>
                      </div>
                      <div className="ml-4 pl-7 border-l-2 border-slate-200 space-y-4">
                        <div>
                          <Label htmlFor="description" className="text-sm text-slate-600 mb-2 block">Description *</Label>
                          <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the pollution incident - what you observed, approximate time, and any other relevant details..."
                            className="min-h-[120px] resize-none border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm text-slate-600 mb-2 block">Photo Evidence (Optional)</Label>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          {imagePreview ? (
                            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-slate-200">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all group"
                            >
                              <div className="flex justify-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                  <Camera className="w-6 h-6 text-slate-500" />
                                </div>
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                  <FileImage className="w-6 h-6 text-slate-500" />
                                </div>
                              </div>
                              <p className="text-sm text-slate-600">Click to capture or upload photo</p>
                              <p className="text-xs text-slate-400 mt-1">Max 10MB, JPG/PNG</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date().toLocaleString()}</span>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 px-8 bg-slate-900 hover:bg-slate-800 shadow-lg gap-2"
                        disabled={!location || !selectedType || !selectedSeverity || !description}
                      >
                        Submit Report <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="track" className="mt-0">
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <History className="w-4 h-4 text-purple-600" />
                      </div>
                      Your Signal Reports
                    </CardTitle>
                    <CardDescription className="mt-1">Track status of your submitted pollution reports</CardDescription>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by ID, ward, or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-slate-200"
                    />
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {filteredReports.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 font-medium">No reports found</p>
                      <p className="text-sm text-slate-400">Try adjusting your search query</p>
                    </div>
                  ) : (
                    filteredReports.map((report) => {
                      const statusConfig = getStatusConfig(report.status);
                      const typeConfig = signalTypes.find((s) => s.value === report.signal_type);
                      const severityConfig = severityLevels.find((s) => s.value === report.intensity);
                      
                      return (
                        <div key={report.id} className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border">
                                <AvatarFallback className={`bg-gradient-to-br ${typeConfig?.color} text-white`}>
                                  {typeConfig?.icon}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-mono font-bold text-slate-900">{report.id}</p>
                                <p className="text-sm text-slate-500">Ward {report.ward_no} - {report.ward_name}</p>
                              </div>
                            </div>
                            <Badge className={`${statusConfig.color} gap-1 font-medium`}>
                              {statusConfig.icon} {statusConfig.label}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Issue Type</p>
                              <p className="text-sm font-medium text-slate-900 mt-0.5">{typeConfig?.label}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Severity</p>
                              <Badge variant="outline" className={`mt-0.5 ${severityConfig?.bgColor}`}>
                                {severityConfig?.label}
                              </Badge>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Submitted</p>
                              <p className="text-sm font-medium text-slate-900 mt-0.5">{report.timestamp.toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 line-clamp-2 p-3 bg-slate-50 rounded-lg">{report.description}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="gradient-hero text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            2025 EcoWard - Urban Air Quality Intelligence Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
