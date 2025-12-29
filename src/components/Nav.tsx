"use client";

import { Building2, ChevronDown, Info, Languages, Menu, Moon, Phone, Shield, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Live Dashboard", description: "Real-time ward-level AQI monitoring" },
  { href: "/ranking", label: "Ward Rankings", description: "Comparative analysis across all wards" },
  { href: "/policies", label: "Policy Framework", description: "Government guidelines and compliance" },
  { href: "/grievance", label: "Citizen Portal", description: "Report pollution incidents" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50">
      <div className="gradient-hero text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> 
              Ministry of Environment & Climate Change
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3" /> 1800-AQI-CLEAN
            </span>
          </div>
          <div className="flex gap-3 items-center text-xs">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                  <Languages className="w-3.5 h-3.5" /> EN <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
                <DropdownMenuItem>Regional</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
<div className="hidden sm:flex items-center gap-1 border-l border-white/20 pl-3">
                <button className="hover:text-amber-400">A-</button>
                <span className="text-white/40">|</span>
                <button className="font-bold hover:text-amber-400">A</button>
                <span className="text-white/40">|</span>
                <button className="hover:text-amber-400">A+</button>
              </div>
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-1.5 border-l border-white/20 pl-3 hover:text-amber-400 transition-colors"
              >
                {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
              </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="bg-gradient-to-br from-amber-400 to-amber-500 bg-clip-text text-transparent">E</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
<div>
                <h1 className="font-bold text-slate-900 dark:text-white text-xl leading-none tracking-tight">EcoWard</h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Urban Air Quality Intelligence</p>
              </div>
          </Link>
          
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={link.href}
className={`group inline-flex h-9 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            isActive(link.href) 
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                          }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/about" className="hidden sm:block">
              <Button variant="ghost" size="sm" className={`gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/about") ? "bg-slate-100 dark:bg-slate-800" : ""}`}>
                <Info className="w-4 h-4" /> About
              </Button>
            </Link>
            <Link href="/authority">
              <Button 
                size="sm"
                className={`gap-2 shadow-md hover:shadow-lg transition-all ${
                  isActive("/authority") 
                    ? "bg-amber-500 hover:bg-amber-600" 
                    : "bg-slate-900 hover:bg-slate-800"
                } text-white`}
              >
                <Shield className="w-4 h-4" /> 
                <span className="hidden sm:inline">Authority Portal</span>
                <span className="sm:hidden">Portal</span>
              </Button>
            </Link>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
className={`p-4 rounded-xl transition-all ${
                          isActive(link.href) 
                            ? "bg-slate-900 text-white" 
                            : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                    >
                      <p className="font-semibold">{link.label}</p>
                      <p className={`text-xs mt-1 ${isActive(link.href) ? "text-slate-300" : "text-slate-500"}`}>
                        {link.description}
                      </p>
                    </Link>
                  ))}
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2 mt-4">
                      <Info className="w-4 h-4" /> About Dashboard
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
