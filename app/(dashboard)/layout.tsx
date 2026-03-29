'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/layouts/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

const sidebarLinks = [
  { label: 'Portfolio Overview', href: '/portfolio', icon: LayoutDashboard },
  { label: 'My Investments', href: '/portfolio/investments', icon: Wallet },
  { label: 'Transaction History', href: '/portfolio/history', icon: History },
  { label: 'Account Settings', href: '/portfolio/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to allow hydration/storage loading
    const timer = setTimeout(() => {
      if (!isAuthenticated && !localStorage.getItem('token')) {
        router.push('/signin');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token')) {
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
    <div className="min-h-screen bg-white dark:bg-obsidian-950 transition-colors duration-500">
      <Navbar />
      
      <div className="container-xl pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {/* User Profile Card */}
            <div className="p-6 rounded-3xl bg-obsidian-50 dark:bg-white/5 border border-obsidian-200 dark:border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 blur-3xl -mr-12 -mt-12 group-hover:bg-gold-500/20 transition-colors" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center font-bold text-obsidian-950 text-xl">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="font-outfit font-bold text-obsidian-950 dark:text-white truncate">
                    {user?.fullName || 'Investor'}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-obsidian-200 dark:border-white/5 flex items-center justify-between">
                <div className="text-xs text-obsidian-500 dark:text-white/40">
                  Account Status
                </div>
                <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">
                  Active
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl transition-all group",
                      isActive 
                        ? "bg-gold-500 text-obsidian-950 shadow-lg shadow-gold-500/10" 
                        : "text-obsidian-600 dark:text-white/60 hover:bg-obsidian-50 dark:hover:bg-white/5 hover:text-obsidian-950 dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", isActive ? "text-obsidian-950" : "text-obsidian-400 dark:text-white/20 group-hover:text-gold-500")} />
                      <span className="font-outfit font-medium text-sm">{link.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="flex items-center gap-3 w-full p-4 rounded-2xl text-red-500 hover:bg-red-500/5 transition-all group mt-4"
              >
                <LogOut className="w-5 h-5 text-red-500/50 group-hover:text-red-500" />
                <span className="font-outfit font-medium text-sm">Sign Out</span>
              </button>
            </nav>

            {/* Promotion card */}
            <div className="p-6 rounded-3xl bg-gradient-gold group relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-black/10 -rotate-12" />
               <p className="relative z-10 text-obsidian-950 font-outfit font-bold text-sm leading-tight">
                 Refer a friend and earn 1% on their first investment.
               </p>
               <button className="relative z-10 mt-4 px-4 py-2 bg-obsidian-950 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                 Learn More
               </button>
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
