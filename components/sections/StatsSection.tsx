'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Wallet, Trophy } from 'lucide-react';

const stats = [
  {
    label: 'Total Assets Funded',
    value: 'AED 50M+',
    description: 'Premier assets tokenized successfully on the platform.',
    icon: Wallet,
    color: 'from-gold-400 to-gold-600',
    colSpan: 'lg:col-span-2',
  },
  {
    label: 'Annual Yield',
    value: '8.5%',
    description: 'Average returns for our active investor portfolio.',
    icon: TrendingUp,
    color: 'from-emerald-400 to-teal-500',
    colSpan: 'lg:col-span-1',
  },
  {
    label: 'Global Investors',
    value: '2,400+',
    description: 'High-net-worth individuals from 45+ countries.',
    icon: Users,
    color: 'from-blue-400 to-indigo-600',
    colSpan: 'lg:col-span-1',
  },
  {
    label: 'Market Authority',
    value: 'VARA',
    description: 'Fully compliant with Dubai Virtual Asset Regulatory Authority.',
    icon: Trophy,
    color: 'from-purple-400 to-pink-600',
    colSpan: 'lg:col-span-2',
  },
];

export function StatsSection() {
  return (
    <section className="bg-obsidian-900 py-24 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 pattern-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-xl relative z-10 w-full">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Institutional Power
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Market Statistics
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={stat.colSpan}
            >
              <div className="group h-full relative p-8 glass-dark rounded-[40px] border border-white/5 hover:border-gold-500/20 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/5 blur-[100px] group-hover:bg-gold-500/10 transition-colors" />

                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-gold-500/10 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-gold-500" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div key={dot} className="w-1 h-1 bg-white/20 rounded-full" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-2">{stat.label}</h3>
                    <p className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-[280px]">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Micro Chart Simulation */}
                <div className="mt-8 flex items-end gap-1.5 h-12 relative z-10">
                  {[40, 60, 45, 70, 55, 85, 65, 90, 75, 100].map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height * 0.5}px` }}
                      transition={{ duration: 1, delay: i * 0.1 + idx * 0.05 }}
                      className="flex-1 rounded-full bg-white/5 group-hover:bg-gold-500/20 transition-colors"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
