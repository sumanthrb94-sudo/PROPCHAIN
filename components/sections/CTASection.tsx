'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      className="relative py-32 bg-navy-700 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Geometric pattern background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 pattern-grid opacity-60" />
        {/* Gold geometric shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 border-[80px] border-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border-[60px] border-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border-[40px] border-teal-500/5 rounded-full -translate-y-1/2" />
        {/* Gold blobs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-6">
            <span
              className="w-2 h-2 bg-gold-500 rounded-full animate-pulse-gold"
              aria-hidden="true"
            />
            Limited Opportunities Available
          </span>

          <h2
            id="cta-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6"
          >
            Start Building Your{' '}
            <span className="text-gold-500">Property Portfolio</span> Today
          </h2>

          <p className="font-body text-white/70 text-lg md:text-xl mb-10 leading-relaxed">
            Join 2,400+ investors already earning from Dubai&apos;s premium real estate market.
            Get started in minutes — no experience required.
          </p>

          {/* Email capture form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl px-8 py-5 max-w-md mx-auto"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
              <div className="text-left">
                <p className="text-white font-semibold">You&apos;re on the list!</p>
                <p className="text-white/60 text-sm">We&apos;ll be in touch within 24 hours.</p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              aria-label="Get started with PropChain"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 min-w-0 px-5 py-4 bg-white/10 border border-white/20 hover:border-white/40 focus:border-gold-500 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:bg-white/15 transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold px-7 py-4 rounded-xl shadow-glow hover:shadow-glow transition-all whitespace-nowrap"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}

          {/* Trust signals below form */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {[
              'No minimum commitment',
              'Cancel anytime',
              'VARA Licensed',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-white/50 text-sm font-body"
              >
                <Shield className="w-3.5 h-3.5 text-gold-500/60" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-12"
          >
            {[
              { value: 'AED 50M+', label: 'Funded to date' },
              { value: '8.5%', label: 'Avg annual yield' },
              { value: '< 5 min', label: 'KYC verification' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-gold-500">
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs md:text-sm font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
