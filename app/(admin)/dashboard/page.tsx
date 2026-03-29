'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowUpRight, 
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Demo Data Simulation Hook
function useAdminDemoStats() {
  const [stats, setStats] = useState({
    totalVolume: 42500000,
    activeUsers: 12450,
    newKYC: 14,
    propertiesFunded: 24,
  });

  const [recentTx, setRecentTx] = useState([
    { id: 'tx-1', type: 'Investment', user: 'Ali M.', amount: 50000, property: 'Marina Penthouse', time: 'Just now', status: 'completed' },
    { id: 'tx-2', type: 'Deposit', user: 'Sarah K.', amount: 125000, property: '--', time: '2m ago', status: 'completed' },
    { id: 'tx-3', type: 'Dividend', user: 'John D.', amount: 450, property: 'DIFC Hub', time: '5m ago', status: 'completed' },
  ]);

  // Simulate real-time ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 5000),
      }));
      
      // Occasionally push a new fake transaction
      if (Math.random() > 0.7) {
        setRecentTx(prev => {
          const newTx = {
            id: `tx-${Math.random()}`,
            type: Math.random() > 0.5 ? 'Investment' : 'Deposit',
            user: `User-${Math.floor(Math.random() * 999)}`,
            amount: Math.floor(Math.random() * 10000) + 1000,
            property: Math.random() > 0.5 ? 'Palm Villa' : 'JLT Office',
            time: 'Just now',
            status: 'completed'
          };
          return [newTx, ...prev.slice(0, 4)]; // Keep 5
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { stats, recentTx };
}

export default function AdminDashboardPage() {
  const { stats, recentTx } = useAdminDemoStats();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-serif font-bold text-obsidian-950 dark:text-white">
          Control Center
        </h1>
        <p className="text-obsidian-500 dark:text-white/40 font-outfit">
          Real-time global platform metrics and system health.
        </p>
      </div>

      {/* Primary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Total Platform Volume */}
        <div className="col-span-12 lg:col-span-8 p-8 rounded-[2rem] bg-gradient-navy border border-obsidian-200 dark:border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          
          <div className="flex items-center gap-3 text-gold-500 mb-8 relative z-10">
             <TrendingUp className="w-5 h-5" />
             <span className="font-outfit font-bold text-xs uppercase tracking-widest text-white/70">Total Platform Volume</span>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <motion.div 
              key={stats.totalVolume} // Triggers entry animation on value change
              initial={{ y: -5, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-7xl font-serif font-bold text-white tracking-tight"
            >
              {formatCurrency(stats.totalVolume)}
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> 24.5%
              </span>
              <span className="text-sm font-bold text-white/40 uppercase tracking-wider">MoM Growth</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 pointer-events-none">
             {/* Fake Line Chart Gradient */}
             <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
               <path d="M0,100 L0,50 Q100,20 200,60 T400,30 L400,100 Z" fill="url(#navyGrad)" />
               <path d="M0,50 Q100,20 200,60 T400,30" fill="none" stroke="#2DD4BF" strokeWidth="3" />
               <defs>
                 <linearGradient id="navyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" style={{ stopColor: '#2DD4BF', stopOpacity: 0.4 }} />
                   <stop offset="100%" style={{ stopColor: '#2DD4BF', stopOpacity: 0 }} />
                 </linearGradient>
               </defs>
             </svg>
          </div>
        </div>

        {/* Small Metric: Active Users */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 p-6 rounded-[2rem] bg-white dark:bg-[#0F1219] border border-black/5 dark:border-white/5 shadow-xl hover:scale-[1.02] transition-transform group">
            <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                 <Users className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">+142 today</span>
            </div>
            <p className="font-outfit font-bold text-[10px] uppercase tracking-widest text-obsidian-400 dark:text-white/40 mb-1">Active Investors</p>
            <p className="text-4xl font-serif font-bold text-obsidian-950 dark:text-white">{stats.activeUsers.toLocaleString()}</p>
          </div>

          <div className="flex-1 p-6 rounded-[2rem] bg-white dark:bg-[#0F1219] border border-black/5 dark:border-white/5 shadow-xl hover:scale-[1.02] transition-transform group">
             <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                 <Building2 className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">2 funding</span>
            </div>
            <p className="font-outfit font-bold text-[10px] uppercase tracking-widest text-obsidian-400 dark:text-white/40 mb-1">Properties Indexed</p>
            <p className="text-4xl font-serif font-bold text-obsidian-950 dark:text-white">{stats.propertiesFunded}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Transaction Feed */}
        <div className="col-span-12 lg:col-span-8 p-8 rounded-[2rem] bg-white dark:bg-[#0F1219] border border-black/5 dark:border-white/5 shadow-lg">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
               <h3 className="text-lg font-serif font-bold text-obsidian-950 dark:text-white">Live Global Feed</h3>
               <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                 Live
               </div>
             </div>
             <button className="text-[10px] font-bold uppercase tracking-widest text-gold-500 hover:text-gold-400">View All</button>
           </div>

           <div className="space-y-1">
              <AnimatePresence initial={false}>
                {recentTx.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ opacity: { duration: 0.2 } }}
                    className="flex justify-between items-center py-4 px-2 border-b border-black/5 dark:border-white/5 last:border-0 group hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                         tx.type === 'Investment' ? "bg-indigo-500/10 text-indigo-500" : 
                         tx.type === 'Dividend' ? "bg-emerald-500/10 text-emerald-500" : "bg-obsidian-200 dark:bg-white/10 text-obsidian-950 dark:text-white"
                       )}>
                         {tx.type[0]}
                       </div>
                       <div>
                         <p className="font-outfit font-bold text-sm text-obsidian-950 dark:text-white">{tx.user}</p>
                         <p className="text-[11px] font-bold uppercase tracking-wider text-obsidian-400 dark:text-white/30">
                           {tx.type} • {tx.property}
                         </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-mono font-bold text-obsidian-950 dark:text-white">{formatCurrency(tx.amount)}</p>
                       <p className="text-[10px] font-bold uppercase text-obsidian-400 dark:text-white/30">{tx.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        {/* Action Center */}
        <div className="col-span-12 lg:col-span-4 p-8 rounded-[2rem] bg-obsidian-950 dark:bg-[#151921] border border-obsidian-800 dark:border-white/10 shadow-xl flex flex-col">
           <h3 className="text-lg font-serif font-bold text-white mb-6">Action Center</h3>
           
           <div className="flex-1 space-y-4">
             {/* KYC Alert */}
             <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 flex gap-4">
               <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
               <div>
                  <h4 className="font-bold text-white text-sm mb-1">Action Required</h4>
                  <p className="text-xs text-white/60 mb-3">There are {stats.newKYC} new high-value investor KYC applications pending review.</p>
                  <button className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-400 transition-colors">
                    Review Queue
                  </button>
               </div>
             </div>

             {/* System Health */}
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
               <Activity className="w-6 h-6 text-emerald-500 shrink-0" />
               <div className="flex-1 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm">Blockchain Node</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Ethereum Mainnet</p>
                  </div>
                  <span className="text-emerald-500 text-xs font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Syncing
                  </span>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
