"use client";

import { useEffect } from "react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";
import {
  BarChart3,
  Briefcase,
  Wallet,
  Coins,
  Settings,
  Receipt,
  Calendar,
  Target,
  Award,
  Users,
  FileText,
  Bell,
} from "lucide-react";

export default function FinanceLayout({ children }) {
  const { data: user, loading } = useUser();
  const { signOut } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.email !== "geral@mindframe.media")) {
      if (typeof window !== "undefined") {
        window.location.href = "/admin";
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || user.email !== "geral@mindframe.media") {
    return null;
  }

  const tabs = [
    { href: "/admin/finance", label: "Overview", icon: BarChart3 },
    { href: "/admin/finance/projects", label: "Projects", icon: Briefcase },
    { href: "/admin/finance/expenses", label: "Expenses", icon: Receipt },
    { href: "/admin/finance/salaries", label: "Targets", icon: Target },
    { href: "/admin/finance/vat", label: "VAT", icon: FileText },
    { href: "/admin/finance/irc", label: "IRC", icon: FileText },
    { href: "/admin/finance/crypto", label: "Crypto", icon: Coins },
    { href: "/admin/finance/months", label: "Months", icon: Calendar },
    { href: "/admin/finance/reports", label: "Reports", icon: FileText },
    { href: "/admin/finance/settings", label: "Settings", icon: Settings },
    { href: "/admin/finance/gamification", label: "Gamification", icon: Award },
    { href: "/admin/finance/clients", label: "Clients", icon: Users },
    { href: "/admin/finance/cashflow", label: "Cash Flow", icon: Wallet },
    { href: "/admin/finance/budget", label: "Budget", icon: FileText },
    { href: "/admin/finance/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black font-montserrat">
            Finance <span className="text-[#FF0000]">Dashboard</span>
          </h1>
          <a
            href="/admin/dashboard"
            className="text-sm text-gray-700 hover:text-[#FF0000] font-poppins"
          >
            Back to Admin
          </a>
        </div>
      </div>

      {/* Subnav */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-4 py-2 min-w-max">
            {tabs.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="px-4 py-2 rounded hover:bg-gray-800 text-gray-300 hover:text-white flex items-center gap-2"
              >
                <t.icon size={18} />
                <span className="font-poppins whitespace-nowrap">
                  {t.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
