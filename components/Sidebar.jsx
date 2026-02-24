'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Map, GraduationCap, BrainCircuit, FileText, Settings, Leaf
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/carte', label: 'Carte territoriale', icon: Map },
  { href: '/formations', label: 'Offre de formation', icon: GraduationCap },
  { href: '/analyse-ia', label: 'Analyse IA', icon: BrainCircuit },
  { href: '/rapports', label: 'Rapports', icon: FileText },
  { href: '/administration', label: 'Administration', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col z-50 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/20">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-lg leading-none">OATIA</div>
          <div className="text-slate-400 text-xs mt-0.5">Analyse Territoriale IA</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              )}
            >
              <Icon className={clsx('w-5 h-5 flex-shrink-0', active ? 'text-green-400' : 'text-slate-500')} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700/50">
        <div className="bg-slate-800/60 rounded-lg px-3 py-2.5">
          <div className="text-xs text-slate-400">Version 1.0 – Février 2026</div>
          <div className="text-xs text-slate-500 mt-0.5">MASA / DGER</div>
        </div>
      </div>
    </aside>
  );
}
