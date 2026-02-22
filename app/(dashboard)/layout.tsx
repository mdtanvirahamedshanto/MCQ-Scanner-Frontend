"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";
import { useAuth } from "@/components/ui/AuthContext";
import {
  LayoutDashboard,
  PlayCircle,
  Grid3X3,
  CheckCircle2,
  KeyRound,
  Menu,
  X,
  LayoutGrid,
  FileQuestion,
  CreditCard,
  LogOut,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [
      {
        label: "ড্যাশবোর্ড",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "পরীক্ষা",
    items: [
      {
        label: "আমার পরীক্ষা",
        href: "/exams/create",
        icon: FileQuestion,
      },
    ],
  },
  {
    title: "OMR সংক্রান্ত",
    items: [
      {
        label: "OMR টিউটোরিয়াল",
        href: "/omr/tutorial",
        icon: PlayCircle,
      },
      {
        label: "OMR তৈরী",
        href: "/omr/generator",
        icon: Grid3X3,
      },
      {
        label: "OMR মূল্যায়ন",
        href: "/omr/evaluator",
        icon: CheckCircle2,
      },
      {
        label: "OMR টোকেন",
        href: "/omr/token",
        icon: KeyRound,
      },
    ],
  },
  {
    title: "অন্যান্য",
    items: [
      {
        label: "সাবস্ক্রিপশন",
        href: "/subscription",
        icon: CreditCard,
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("U");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("mcqscanner_user_name");
    if (stored) {
      const initials = stored
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      setUserName(initials);
    }
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href) ?? false;
  };

  const handleLogout = () => {
    logout();
  };

  if (!isMounted) return null;

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`print:hidden fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-[#1e3a5f] tracking-tight">
                MCQ Scanner
              </span>
            </Link>
            <button
              className="ml-auto lg:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className={sIdx > 0 ? "mt-5" : ""}>
                <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            active
                              ? "bg-[#1e3a5f] text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              active ? "text-white" : "text-gray-400"
                            }`}
                          />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-100 p-3 shrink-0">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
              <span>লগআউট</span>
            </button>
            <div className="mt-4 px-3 text-[10px] text-gray-400 font-medium">
              Developed by{" "}
              <a
                href="https://mdtanvirahamedshanto.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a5f] hover:underline"
              >
                Md Tanvir Ahamed Shanto
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="print:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="hidden lg:block" />

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <LayoutGrid className="w-5 h-5 text-gray-500" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#7c3aed] flex items-center justify-center cursor-pointer ring-2 ring-[#7c3aed]/20">
                <span className="text-white text-xs font-bold">{userName}</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6 print:p-0 print:overflow-visible text-black bg-white">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
