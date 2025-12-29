"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const success = await login(email, password);
    
    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
    setIsSubmitting(false);
  };

  const demoLogins = [
    { email: "citizen@demo.com", password: "demo", label: "Citizen", icon: <Users className="w-4 h-4" /> },
    { email: "authority@demo.com", password: "demo", label: "Authority", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col">
      <Nav />
      
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <LogIn className="w-3 h-3 mr-1" /> Secure Access
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-300">Sign in to access your EcoWard dashboard</p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-md -mt-8 relative z-10">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
              )}

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-3 text-xs text-slate-400">
                or try demo accounts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {demoLogins.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword(demo.password);
                  }}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {demo.icon}
                    <span className="font-medium text-sm">{demo.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{demo.email}</p>
                </button>
              ))}
            </div>

            <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link href="/register" className="text-amber-600 hover:text-amber-700 font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Demo Mode Active</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                Use any of the demo accounts above to explore all features. No real data is stored.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="gradient-hero text-white py-8 border-t-4 border-amber-500">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-slate-400">© 2025 EcoWard | Secure Authentication Portal</p>
        </div>
      </footer>
    </div>
  );
}
