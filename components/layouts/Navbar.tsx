'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Properties', href: '/properties' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Whitepaper', href: '/whitepaper' },
];

function PropChainLogo({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={cn('flex items-center gap-2.5 group', className)}
      aria-label="PropChain – Home"
    >
      <div
        className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500 overflow-hidden"
      >
        <span className="relative z-10 font-serif font-bold text-obsidian-950 text-xl leading-none">P</span>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="font-outfit font-bold text-xl text-white tracking-tight">
        Prop<span className="text-gold-500">Chain</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4',
        scrolled ? 'py-4' : 'py-6'
      )}
    >
      <nav
        className={cn(
          'container-xl flex items-center justify-between transition-all duration-500',
          scrolled 
            ? 'max-w-[1000px] h-16 bg-obsidian-900/80 backdrop-blur-2xl border border-white/10 rounded-full px-8 shadow-2xl' 
            : 'h-20 bg-transparent px-6'
        )}
        aria-label="Main navigation"
      >
        <PropChainLogo />

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-2" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-5 py-2 text-white/70 hover:text-white font-outfit text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/signin"
            className="flex items-center gap-2 px-5 py-2 text-white/70 hover:text-white font-outfit text-sm font-medium transition-colors"
          >
            <User className="w-4 h-4" />
            Sign In
          </a>
          <a
            href="/register"
            className="px-6 py-2.5 bg-white text-obsidian-950 hover:bg-gold-400 font-outfit text-sm font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-gold-500/20"
          >
            Get Started
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 lg:hidden bg-obsidian-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-40"
          >
            <div className="p-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between w-full p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  <span className="font-outfit font-medium">{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </motion.a>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-3">
                <a
                  href="/signin"
                  className="w-full py-4 text-center text-white/70 hover:text-white font-outfit font-medium bg-white/5 rounded-2xl"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="w-full py-4 text-center bg-gold-400 text-obsidian-950 font-outfit font-bold rounded-2xl"
                >
                  Join Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
