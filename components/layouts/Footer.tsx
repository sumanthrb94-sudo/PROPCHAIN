'use client';

import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram, Send, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const footerLinks = {
  Platform: [
    { label: 'Browse Properties', href: '/properties' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Secondary Market', href: '/market' },
    { label: 'Portfolio Dashboard', href: '/dashboard' },
    { label: 'Referral Program', href: '/referral' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Risk Disclosure', href: '/risk' },
    { label: 'VARA License', href: '/vara-license' },
    { label: 'Whitepaper', href: '/whitepaper' },
  ],
};

const socialLinks = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/propchainAE',
    icon: <Twitter className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/propchain-ae',
    icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/propchainAE',
    icon: <Instagram className="w-5 h-5" aria-hidden="true" />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/propchainAE',
    icon: <Send className="w-5 h-5" aria-hidden="true" />,
  },
];

const licenseBadges = [
  { label: 'VARA Licensed', sub: 'Virtual Assets Regulatory Authority' },
  { label: 'SCA Regulated', sub: 'Securities and Commodities Authority' },
  { label: 'UAE Central Bank', sub: 'Compliant Platform' },
  { label: 'ISO 27001', sub: 'Certified Security' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-800 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Main footer content */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group" aria-label="PropChain – Home">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
                <span className="font-display font-bold text-navy-700 text-xl leading-none">P</span>
              </div>
              <span className="font-display font-semibold text-2xl text-white">PropChain</span>
            </a>

            <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs">
              Own Premium Dubai Properties from AED 500. Fractional ownership meets blockchain.
              Instant liquidity, automated dividends, VARA-compliant.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 flex items-center justify-center text-white/60 hover:text-gold-500 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">
                Get property investment insights
              </p>
              {subscribed ? (
                <p className="text-emerald-400 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  Thanks! You&apos;re subscribed.
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2"
                  aria-label="Newsletter subscription"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 min-w-0 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold-500 focus:bg-white/15 transition-colors"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold text-sm rounded-lg transition-colors shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-gold-400 font-body text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* License badges */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-6 text-center">
            Regulated &amp; Certified
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {licenseBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Shield className="w-4 h-4 text-gold-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold leading-tight">{badge.label}</p>
                  <p className="text-white/40 text-xs mt-0.5 truncate">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-navy-900">
        <div className="container-xl py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} PropChain FZCO. All rights reserved. VARA License
            #VA-2024-001.
          </p>
          <p className="text-center">
            Investing in real estate tokens involves risk. Past performance is not indicative of
            future results. Please read our{' '}
            <a href="/risk" className="text-gold-500/60 hover:text-gold-500 transition-colors">
              Risk Disclosure
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
