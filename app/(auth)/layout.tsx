'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-obsidian-950 transition-colors duration-500">
      {/* Left side: Content / Form */}
      <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 z-10">
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-obsidian-500 hover:text-gold-500 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-outfit font-medium text-sm">Back to Home</span>
        </Link>
        
        <div className="max-w-md w-full mx-auto space-y-8">
          {children}
        </div>
      </div>

      {/* Right side: Image / Branding */}
      <div className="hidden lg:block relative overflow-hidden bg-obsidian-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-bg-4k.png" 
            alt="Dubai Luxury Real Estate" 
            className="w-full h-full object-cover opacity-60 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-gold-400 font-outfit text-xs font-bold uppercase tracking-widest">Premium Fractional Ownership</span>
            </div>
            
            <h2 className="text-5xl font-serif font-bold text-white leading-tight">
              Invest in the Future of <br />
              <span className="text-gold-400">Dubai Real Estate</span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              Unlock prestigious property yields from AED 500. Secure, blockchain-powered, and fully compliant.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
