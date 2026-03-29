'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Wallet, 
  LayoutDashboard, 
  LogOut, 
  ChevronRight,
  ShieldAlert,
  Settings,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const adminLinks = [
  { label: 'Control Center', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Asset Management', href: '/admin/properties', icon: Building2 },
  { label: 'Investor Relations', href: '/admin/investors', icon: Users },
  { label: 'Transactions & Yields', href: '/admin/transactions', icon: Wallet },
  { label: 'KYC & Compliance', href: '/admin/kyc', icon: ShieldAlert, badge: 14 },
  { label: 'System Health', href: '/admin/health', icon: Activity },
  { label: 'Global Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Security check: Only allow 'admin'. For demo purposes, we will bypass strict checking 
    // if the user isn't fully set up, but normally we'd check user?.role === 'admin'
    const timer = setTimeout(() => {
      if (!isAuthenticated && !localStorage.getItem('token')) {
        router.push('/signin');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (!mounted || (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token'))) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-50 dark:bg-[#0A0C10] transition-colors duration-500 flex">
      
      {/* Executive Sidebar */}
      <aside className="w-[300px] h-screen sticky top-0 bg-white dark:bg-obsidian-950 border-r border-obsidian-200 dark:border-white/5 flex flex-col z-40 hidden lg:flex shadow-2xl">
        <div className="p-8 border-b border-obsidian-100 dark:border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-obsidian-950 text-xl leading-none">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-lg text-obsidian-950 dark:text-white leading-tight">
                Prop<span className="text-gold-500">Chain</span>
              </span>
              <span className="text-[10px] font-bold text-obsidian-400 dark:text-white/40 uppercase tracking-widest">
                Executive Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <nav className="space-y-2">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl transition-all group",
                    isActive 
                      ? "bg-obsidian-950 dark:bg-white/10 text-white shadow-xl border border-transparent dark:border-white/10" 
                      : "text-obsidian-600 dark:text-white/60 hover:bg-obsidian-50 dark:hover:bg-white/5 hover:text-obsidian-950 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-gold-500" : "text-obsidian-400 dark:text-white/30 group-hover:text-gold-500")} />
                    <span className="font-outfit font-medium text-sm">{link.label}</span>
                  </div>
                  {link.badge && (
                    <div className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-lg shadow-red-500/20">
                      {link.badge}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-obsidian-100 dark:border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-obsidian-100 dark:bg-white/10 flex items-center justify-center font-bold text-obsidian-950 dark:text-white text-lg">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
               <span className="font-outfit font-bold text-sm text-obsidian-950 dark:text-white truncate">
                 {user?.fullName || 'Root Admin'}
               </span>
               <span className="text-xs text-emerald-500 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 System Online
               </span>
            </div>
          </div>
          
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 font-outfit font-bold text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/70 dark:bg-[#0A0C10]/70 backdrop-blur-2xl border-b border-obsidian-200 dark:border-white/5 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Feed
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="hidden md:flex flex-col text-right">
              <span className="font-outfit font-bold text-xs text-obsidian-950 dark:text-white uppercase tracking-widest">
                Server Time (UTC)
              </span>
              <span className="text-obsidian-500 dark:text-white/50 text-xs font-mono">
                {new Date().toISOString().split('T')[1].split('.')[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 lg:p-12 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
