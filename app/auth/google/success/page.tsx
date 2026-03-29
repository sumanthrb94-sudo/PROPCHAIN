'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';

export default function GoogleSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(token, user);
        router.replace('/portfolio');
      } catch {
        router.replace('/signin');
      }
    } else {
      router.replace('/signin');
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full"
      />
    </div>
  );
}
