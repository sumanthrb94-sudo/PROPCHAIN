'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight,
  PieChart, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Mock data for the Bento Grid (In Phase 3 this will be from usePortfolioSummary)
const stats = {
  totalBalance: 'AED 128,450.00',
  monthlyYield: 'AED 1,120.50',
  totalAssets: 4,
  yieldRate: '+8.4%',
  growth: '+12.5%',
};

export default function PortfolioPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-obsidian-950 dark:text-white">
            Portfolio <span className="text-gold-500 italic">Overview</span>
          </h1>
          <p className="text-obsidian-500 dark:text-white/40 mt-1">
            Real-time performance of your tokenized real estate assets.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-obsidian-950 dark:bg-gold-500 text-white dark:text-obsidian-950 font-outfit font-bold text-xs rounded-xl shadow-lg hover:shadow-gold-500/20 transition-all">
             Add Funds
           </button>
           <button className="px-4 py-2 bg-obsidian-50 dark:bg-white/5 border border-obsidian-200 dark:border-white/10 text-obsidian-700 dark:text-white font-outfit font-bold text-xs rounded-xl hover:bg-obsidian-100 dark:hover:bg-white/10 transition-all">
             Withdraw
           </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        
        {/* Main Stat: Net Worth */}
        <div className="md:col-span-6 lg:col-span-8 p-8 rounded-[2rem] bg-obsidian-950 dark:bg-white/5 border border-white/5 dark:border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-center gap-3 text-gold-500 mb-6">
            <Wallet className="w-6 h-6" />
            <span className="font-outfit font-bold text-sm uppercase tracking-widest">Total Portfolio Value</span>
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
              {stats.totalBalance}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                <ArrowUpRight className="w-4 h-4" />
                {stats.growth}
              </div>
              <span className="text-white/30 text-sm font-outfit italic">Since last month</span>
            </div>
          </div>
          
          {/* Decorative Graph Placeholder */}
          <div className="absolute bottom-0 right-0 left-0 h-32 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
               <path d="M0,80 Q50,40 100,70 T200,30 T300,50 T400,10" fill="none" stroke="currentColor" strokeWidth="4" className="text-gold-500" />
               <path d="M0,80 Q50,40 100,70 T200,30 T300,50 T400,10 L400,100 L0,100 Z" fill="url(#grad)" className="text-gold-500" />
               <defs>
                 <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
                   <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0 }} />
                 </linearGradient>
               </defs>
             </svg>
          </div>
        </div>

        {/* Secondary Stat: Yield */}
        <div className="md:col-span-3 lg:col-span-4 p-8 rounded-[2rem] bg-obsidian-50 dark:bg-obsidian-900 border border-obsidian-200 dark:border-white/5 shadow-xl relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
          <div className="flex items-center gap-3 text-emerald-500 mb-4 px-1">
            <TrendingUp className="w-5 h-5" />
            <span className="font-outfit font-bold text-xs uppercase tracking-widest text-obsidian-500 dark:text-white/40">Monthly Yield</span>
          </div>
          
          <div className="text-3xl font-serif font-bold text-obsidian-950 dark:text-white">
            {stats.monthlyYield}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-obsidian-500 dark:text-white/30 font-medium italic">Estimated ROI</span>
            <span className="text-sm text-emerald-500 font-bold">{stats.yieldRate} APY</span>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-2">
            <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
              <p className="text-[10px] text-obsidian-400 dark:text-white/20 font-bold uppercase tracking-wider">Historical</p>
              <p className="text-obsidian-950 dark:text-white font-serif font-bold">8.2%</p>
            </div>
            <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
              <p className="text-[10px] text-obsidian-400 dark:text-white/20 font-bold uppercase tracking-wider">Projected</p>
              <p className="text-emerald-500 font-serif font-bold">9.1%</p>
            </div>
          </div>
        </div>

        {/* Assets Count */}
        <div className="md:col-span-3 lg:col-span-4 p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl group cursor-pointer hover:bg-gold-500/5 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-obsidian-300 dark:text-white/20 group-hover:text-gold-500 transition-colors" />
          </div>
          <p className="font-outfit font-bold text-xs uppercase tracking-widest text-obsidian-400 dark:text-white/40">Active Assets</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-4xl font-serif font-bold text-obsidian-950 dark:text-white">{stats.totalAssets}</span>
            <span className="text-sm text-obsidian-500 dark:text-white/30 mb-1 font-medium font-outfit">Properties</span>
          </div>
        </div>

        {/* Small Module: Diversification */}
        <div className="md:col-span-3 lg:col-span-4 p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl">
           <div className="flex items-center gap-3 mb-6">
             <PieChart className="w-5 h-5 text-indigo-500" />
             <span className="font-outfit font-bold text-xs uppercase tracking-widest text-obsidian-500 dark:text-white/40">Portfolio Split</span>
           </div>
           <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-obsidian-950 dark:text-white/80 uppercase">Residential</span>
                  <span className="text-gold-500">65%</span>
                </div>
                <div className="h-1 bg-obsidian-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500 w-[65%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-obsidian-950 dark:text-white/80 uppercase">Commercial</span>
                  <span className="text-indigo-400">35%</span>
                </div>
                <div className="h-1 bg-obsidian-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[35%]" />
                </div>
              </div>
           </div>
        </div>

        {/* Small Module: Next Dividend */}
        <div className="md:col-span-3 lg:col-span-4 p-8 rounded-[2rem] bg-gradient-to-br from-obsidian-50 to-white dark:from-white/10 dark:to-white/5 border border-black/5 dark:border-white/10 shadow-xl group">
           <div className="flex items-center gap-3 mb-6">
             <Clock className="w-5 h-5 text-gold-500" />
             <span className="font-outfit font-bold text-xs uppercase tracking-widest text-obsidian-500 dark:text-white/40">Next Payout</span>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold text-obsidian-950 dark:text-white">12</span>
                <span className="text-[10px] font-bold uppercase text-obsidian-400 dark:text-white/30 tracking-widest">Days Left</span>
              </div>
              <div className="h-12 w-px bg-obsidian-200 dark:bg-white/10" />
              <div>
                 <p className="text-emerald-500 font-outfit font-bold text-lg">AED 450.25</p>
                 <p className="text-[10px] font-medium text-obsidian-500 dark:text-white/30 italic">Expected Dividend</p>
              </div>
           </div>
        </div>

        {/* Large Module: Recent Assets Performance */}
        <div className="md:col-span-6 lg:col-span-12 p-8 rounded-[3rem] bg-obsidian-50 dark:bg-white/5 border border-obsidian-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-serif font-bold text-obsidian-950 dark:text-white">Recent Performance</h3>
             <button className="flex items-center gap-2 text-xs font-bold text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-widest">
                Full History <ExternalLink className="w-3 h-3" />
             </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-obsidian-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-obsidian-400 dark:text-white/40">
                   <th className="pb-4">Property</th>
                   <th className="pb-4">Type</th>
                   <th className="pb-4">Invested Value</th>
                   <th className="pb-4">Market Value</th>
                   <th className="pb-4">Change</th>
                   <th className="pb-4 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="text-sm font-outfit">
                 {[
                   { name: 'The Marina Penthouse', type: 'Residential', invested: '52,000', market: '58,450', change: '+12.4%', up: true },
                   { name: 'DIFC Business Hub', type: 'Commercial', invested: '35,000', market: '38,200', change: '+9.1%', up: true },
                 ].map((row, i) => (
                   <tr key={row.name} className="border-b border-obsidian-100 dark:border-white/5 last:border-0 group">
                     <td className="py-6 font-bold text-obsidian-950 dark:text-white">{row.name}</td>
                     <td className="py-6 text-obsidian-500 dark:text-white/50">{row.type}</td>
                     <td className="py-6 font-mono text-obsidian-950 dark:text-white/80">AED {row.invested}</td>
                     <td className="py-6 font-mono text-obsidian-950 dark:text-white">AED {row.market}</td>
                     <td className={cn("py-6 font-bold", row.up ? "text-emerald-500" : "text-red-500")}>{row.change}</td>
                     <td className="py-6 text-right">
                        <button className="p-2 rounded-xl bg-obsidian-950 dark:bg-gold-500 text-white dark:text-obsidian-950 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
}
