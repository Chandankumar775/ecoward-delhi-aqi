"use client";

import { Nav } from "@/components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, ExternalLink, ShieldCheck, Scale, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PoliciesPage() {
  const policies = [
    {
      title: "Clean Air Act (Amended 2024)",
      category: "Legislative",
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      description: "Comprehensive framework for controlling air pollution and maintaining ambient air quality standards.",
      updated: "March 15, 2024"
    },
    {
      title: "Municipal Waste Management Policy",
      category: "Regulation",
      icon: <FileText className="w-5 h-5 text-green-600" />,
      description: "Guidelines for zero-burning of waste and localized composting initiatives to reduce methane emissions.",
      updated: "January 10, 2025"
    },
    {
      title: "Green Transport Initiative 2025",
      category: "Strategic",
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      description: "Policy roadmap for transitioning public transport to 100% electric and expanding cycling lanes.",
      updated: "December 01, 2024"
    },
    {
      title: "Industrial Emission Standards",
      category: "Enforcement",
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      description: "Strict compliance protocols for industrial units within city limits and heavy penalty structures.",
      updated: "November 20, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl space-y-12">
        <div className="space-y-4 border-b pb-8">
          <h2 className="text-3xl font-serif font-bold text-gov-blue">Policy Framework & Documentation</h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Access official government documents, legislative acts, and municipal regulations governing environmental standards and pollution control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <Card key={policy.title} className="hover:shadow-md transition-shadow group border-l-4 border-l-gov-gold">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
                  {policy.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    {policy.category}
                  </div>
                  <CardTitle className="text-lg text-slate-900 group-hover:text-gov-blue transition-colors">
                    {policy.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-sm leading-relaxed text-slate-600">
                  {policy.description}
                </CardDescription>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    Last Updated: {policy.updated}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
                      <Download className="w-3 h-3" /> PDF
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-2 text-xs gap-1 border-slate-200">
                      <ExternalLink className="w-3 h-3" /> View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources Section */}
        <section className="bg-slate-50 rounded-2xl p-8 border space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gov-blue" />
            Additional Statutory Resources
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border text-sm text-slate-700 hover:border-gov-gold transition-colors cursor-pointer group">
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-gov-gold" />
              Environment (Protection) Act, 1986
            </li>
            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border text-sm text-slate-700 hover:border-gov-gold transition-colors cursor-pointer group">
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-gov-gold" />
              National Green Tribunal Guidelines
            </li>
            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border text-sm text-slate-700 hover:border-gov-gold transition-colors cursor-pointer group">
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-gov-gold" />
              Plastic Waste Management Rules, 2021
            </li>
            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border text-sm text-slate-700 hover:border-gov-gold transition-colors cursor-pointer group">
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-gov-gold" />
              E-Waste (Management) Rules, 2022
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
