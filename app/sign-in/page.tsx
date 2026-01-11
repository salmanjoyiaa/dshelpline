'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2, ArrowLeft, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
      logger.error('Sign in error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-black opacity-85"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-5 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-3 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header with Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition font-semibold">
              <ArrowLeft className="w-5 h-5" />
              Go back
            </button>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-4xl font-black text-white">
                  Dream State AI
                </h1>
              </div>
              <p className="text-gray-300">Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-white mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-xl h-11 focus:border-yellow-500 focus:bg-white/20 transition"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-white mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-xl h-11 focus:border-yellow-500 focus:bg-white/20 transition"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-2 rounded-xl h-11 text-base transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl">
              <p className="text-sm font-bold text-white mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-300">
                  <span className="text-yellow-400 font-semibold">Locksmith:</span> salman@locksmith.com / Test123456
                </div>
                <div className="text-sm text-gray-300">
                  <span className="text-yellow-400 font-semibold">Window Cleaning:</span> mustafa@windowcleaning.com / Test123456
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-400 mt-6">
            New to Dream State AI?{' '}
            <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition font-semibold">
              Explore now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
