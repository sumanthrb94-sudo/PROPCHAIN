'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import type { Property } from '@/lib/data/properties';

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number;
}

function FundingRing({ funded, size = 64 }: { funded: number; size?: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (funded / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="4"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="absolute font-outfit font-bold text-[10px] text-gold-500">{funded}%</span>
    </div>
  );
}

export function PropertyCard({ property, className, index = 0 }: PropertyCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("group perspective-1000 w-full", className)}
    >
      <article className="relative h-full glass-dark rounded-[32px] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-gold-500/40 group-hover:gold-glow">
        
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 saturate-150 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-gold-500 text-obsidian-950 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {property.type}
            </span>
            {property.status === 'coming-soon' && (
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                Coming Soon
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
             <div className="glass-dark px-3 py-2 rounded-2xl border border-white/10">
                <p className="text-gold-500 font-bold text-lg leading-none">{property.annualYield}%</p>
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest mt-0.5">Yield</p>
             </div>
             <FundingRing funded={property.funded} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col gap-6">
          <div className="space-y-1">
            <h3 className="font-serif italic text-2xl text-white group-hover:text-gold-400 transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/40 text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40 font-bold uppercase tracking-widest">Funding Progress</span>
              <span className="text-gold-500 font-bold">{property.funded}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${property.funded}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Min. Invest</p>
              <p className="text-white font-bold">AED {property.minInvestment.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Property Value</p>
              <p className="text-white font-bold">AED {(property.totalValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
               <ShieldCheck className="w-4 h-4" />
               <span>VARA Verified</span>
            </div>
            <a 
              href={`/properties/${property.id}`}
              className="flex items-center gap-2 text-white font-bold text-xs group/btn hover:text-gold-400 transition-colors"
            >
               View Asset
               <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transform skew-x-12" />
      </article>
    </motion.div>
  );
}

export default PropertyCard;
