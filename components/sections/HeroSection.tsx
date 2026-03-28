'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Globe, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const springX = useSpring(mousePos.x, { stiffness: 100, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-obsidian-950 noise-overlay spotlight"
      style={{
        '--mouse-x': `${springX.get()}%`,
        '--mouse-y': `${springY.get()}%`,
      } as any}
    >
      {/* Immersive Background Image */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/assets/property-downtown.png"
          alt="Luxury Dubai Skyline"
          fill
          className="object-cover opacity-70 scale-110 saturate-150 contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/30 via-obsidian-950/70 to-obsidian-950" />
      </motion.div>

      <div className="container-xl relative z-10 w-full pt-32 text-center lg:text-left">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col items-center lg:items-start">
            
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 glass-dark rounded-full border border-white/10 mb-8"
            >
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <span className="text-white/60 font-outfit text-sm font-semibold tracking-wider uppercase">VARA Licensed Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-outfit text-6xl md:text-8xl xl:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8"
            >
              Own Dubai&apos;s <br />
              <span className="text-gradient-gold">Billion-Dollar</span> <br />
              Horizon
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg md:text-2xl font-outfit font-medium leading-relaxed max-w-2xl lg:max-w-xl mb-12"
            >
              Fractional ownership meets elite liquidity. Invest in the UAE&apos;s most prestigious real estate assets from AED 500. Secure, automated, and VARA compliant.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <a href="/properties" className="btn-primary group">
                Access Properties
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/how-it-works" className="btn-secondary group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                  <Play className="w-4 h-4 text-white group-hover:text-obsidian-950 fill-current ml-1" />
                </div>
                View Performance
              </a>
            </motion.div>

            {/* Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-12"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-gold-500" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">2,400+</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">Investors</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gold-500" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">SCA</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">Regulated</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-gold-500" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">Instant</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">Liquidity</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Context */}
          <div className="hidden xl:flex lg:col-span-4 justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-full aspect-[4/5] rounded-[48px] overflow-hidden border border-gold-500/20 glass-dark gold-glow shadow-2xl"
            >
              <Image
                src="/assets/property-marina.png"
                alt="Dubai Property"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent">
                <div className="glass-dark p-6 rounded-3xl border border-white/10">
                  <p className="font-serif italic text-3xl text-white mb-2 leading-none">The Penthouse</p>
                  <p className="text-gold-500 font-bold tracking-widest uppercase text-sm">Dubai Marina</p>
                  <div className="flex items-baseline gap-2 mt-4">
                    <p className="text-2xl font-bold">8.5%</p>
                    <p className="text-white/50 text-xs">Annual Yield</p>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gold-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
