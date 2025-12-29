"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "citizen" | "authority";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: "citizen" | "authority") => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
  { id: "1", email: "citizen@demo.com", name: "Demo Citizen", role: "citizen" },
  { id: "2", email: "authority@demo.com", name: "Municipal Officer", role: "authority" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ecoward_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const foundUser = MOCK_USERS.find((u) => u.email === email);
    if (foundUser && password.length >= 4) {
      setUser(foundUser);
      localStorage.setItem("ecoward_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
      role: "citizen",
    };
    setUser(newUser);
    localStorage.setItem("ecoward_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "citizen" | "authority"
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };
    setUser(newUser);
    localStorage.setItem("ecoward_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecoward_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
