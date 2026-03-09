'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setError('Code incorrect. Veuillez réessayer.');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-sm mx-4">
        {/* Logo & titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 mb-4">
            <Image src="/cneap-logo.png" alt="CNEAP" width={40} height={40} className="rounded-lg" onError={e => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <h1 className="text-2xl font-bold text-white">THÉMIS</h1>
          <p className="text-slate-400 text-sm mt-1">Analyse Territoriale IA · CNEAP</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <div>
            <label htmlFor="code" className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Code d'accès
            </label>
            <input
              id="code"
              type="password"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="••••••••"
              autoFocus
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            {loading ? 'Vérification…' : 'Accéder'}
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-4">
          Accès réservé au CNEAP
        </p>
      </div>
    </div>
  );
}
