'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, RefreshCw, Zap, Shield, UserCheck, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Coins className="w-7 h-7" aria-hidden="true" />,
    title: 'Ultra-Low Entry',
    description:
      'Start your Dubai real estate portfolio with as little as AED 500. No large capital, no barriers — just opportunity.',
  },
  {
    icon: <RefreshCw className="w-7 h-7" aria-hidden="true" />,
    title: '24/7 Trading',
    description:
      'Blockchain-powered secondary market lets you buy and sell property tokens any time of day, with instant settlement.',
  },
  {
    icon: <Zap className="w-7 h-7" aria-hidden="true" />,
    title: 'Automated Dividends',
    description:
      'Quarterly rental income is automatically calculated and distributed to your wallet. No manual collection required.',
  },
  {
    icon: <Shield className="w-7 h-7" aria-hidden="true" />,
    title: 'VARA Compliant',
    description:
      "Fully regulated by the UAE's Virtual Assets Regulatory Authority, with SCA oversight for complete investor protection.",
  },
  {
    icon: <UserCheck className="w-7 h-7" aria-hidden="true" />,
    title: 'Instant KYC',
    description:
      'AI-powered identity verification gets you investment-ready in just 5 minutes. Fully compliant with UAE regulations.',
  },
  {
    icon: <BarChart3 className="w-7 h-7" aria-hidden="true" />,
    title: 'Full Transparency',
    description:
      'On-chain ownership records, real-time reporting, and audited financials give you complete visibility into your investment.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 text-teal-600 text-sm font-semibold mb-4">
            Why PropChain
          </span>
          <h2
            id="features-heading"
            className="font-display text-4xl md:text-5xl text-navy-700 font-semibold"
          >
            Everything you need to{' '}
            <span className="text-gold-500">invest with confidence</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto font-body">
            We&apos;ve built every feature with the sophisticated UAE investor in mind — from
            regulatory compliance to portfolio analytics.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative bg-gray-50 hover:bg-white rounded-2xl p-8 border-2 border-transparent hover:border-gold-500/20 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Icon circle */}
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300',
                  'bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-navy-700',
                  'group-hover:shadow-glow-sm'
                )}
              >
                {feature.icon}
              </div>

              <h3 className="font-display text-xl font-semibold text-navy-700 mb-3 group-hover:text-navy-700">
                {feature.title}
              </h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-0.5 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
