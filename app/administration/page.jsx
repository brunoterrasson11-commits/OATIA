'use client';

import { useState } from 'react';
import {
  Settings, Database, RefreshCw, CheckCircle2, Clock, AlertTriangle,
  Users, Key, Activity, BarChart2, Calendar, Zap, Globe, Shield
} from 'lucide-react';
import { statsGlobales } from '@/lib/data';

const sourcesInitiales = [
  { nom: 'INSEE – Recensement Population', frequence: 'Annuelle', statut: 'ok', dernierMaj: '15/01/2026', indicateurs: 'Population, structure d\'âge, migrations' },
  { nom: 'Agreste – Statistiques agricoles', frequence: 'Annuelle', statut: 'ok', dernierMaj: '01/02/2026', indicateurs: 'SAU, exploitations, productions' },
  { nom: 'France Travail – Emploi', frequence: 'Trimestrielle', statut: 'ok', dernierMaj: '10/02/2026', indicateurs: 'Demandes emploi, métiers en tension' },
  { nom: 'IGN – Géoportail / WMS', frequence: 'Continue', statut: 'ok', dernierMaj: '22/02/2026', indicateurs: 'Couches géographiques, limites admin.' },
  { nom: 'Agence BIO – Surfaces biologiques', frequence: 'Annuelle', statut: 'warning', dernierMaj: '10/10/2025', indicateurs: 'Surfaces BIO, labels, pratiques' },
  { nom: 'DGER – BND formations', frequence: 'Annuelle', statut: 'ok', dernierMaj: '01/11/2025', indicateurs: 'Effectifs, formations, niveaux' },
  { nom: 'API Découpage Administratif', frequence: 'Selon réforme', statut: 'ok', dernierMaj: '01/01/2026', indicateurs: 'Communes, EPCI, départements, régions' },
  { nom: 'ASP / DGPE – RPG / PAC', frequence: 'Annuelle', statut: 'error', dernierMaj: '01/07/2025', indicateurs: 'Parcelles agricoles, cultures' },
];

const workflows = [
  { nom: 'Mise à jour données mensuelles', statut: 'ok', dernierExec: '01/02/2026 00:00', prochaine: '01/03/2026 00:00', duree: '12 min' },
  { nom: 'Recalcul des indices composites', statut: 'ok', dernierExec: '01/02/2026 00:15', prochaine: '01/03/2026 00:15', duree: '3 min' },
  { nom: 'Nettoyage diagnostics obsolètes', statut: 'ok', dernierExec: '15/02/2026 02:00', prochaine: '15/03/2026 02:00', duree: '1 min' },
  { nom: 'Notification équipe (rapport hebdo)', statut: 'warning', dernierExec: '17/02/2026 08:00', prochaine: '24/02/2026 08:00', duree: 'N/A – Timeout' },
];

const statutStyle = {
  ok: { dot: 'bg-green-500', badge: 'bg-green-500/15 text-green-300 border-green-500/30', label: 'OK' },
  warning: { dot: 'bg-amber-500 animate-pulse', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30', label: 'Attention' },
  error: { dot: 'bg-red-500 animate-pulse', badge: 'bg-red-500/15 text-red-300 border-red-500/30', label: 'Erreur' },
};

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState('sources');
  const [refreshing, setRefreshing] = useState(null);
  const [sources, setSources] = useState(sourcesInitiales);
  const [lastRefreshAll, setLastRefreshAll] = useState(null);

  // Rafraîchit une source individuelle : simule la reconnexion + met à jour le statut et la date
  function simulateRefresh(nom) {
    setRefreshing(nom);
    setTimeout(() => {
      const today = new Date().toLocaleDateString('fr-FR');
      setSources(prev =>
        prev.map(s =>
          s.nom === nom
            ? { ...s, statut: 'ok', dernierMaj: today }
            : s
        )
      );
      setRefreshing(null);
    }, 2000);
  }

  // Rafraîchit toutes les sources en une fois
  function refreshAll() {
    setRefreshing('all');
    setTimeout(() => {
      const today = new Date().toLocaleDateString('fr-FR');
      setSources(prev => prev.map(s => ({ ...s, statut: 'ok', dernierMaj: today })));
      setLastRefreshAll(today);
      setRefreshing(null);
    }, 2500);
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-slate-400" /> Administration
        </h1>
        <p className="text-slate-400 mt-1 text-sm">
          Gestion des sources de données, workflows et paramètres système
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/60 border border-slate-700/50 rounded-xl p-1 w-fit">
        {[
          { key: 'sources', label: 'Sources de données', icon: Database },
          { key: 'workflows', label: 'Workflows', icon: Zap },
          { key: 'systeme', label: 'Système', icon: Activity },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Sources tab */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/15 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{sources.filter(s => s.statut === 'ok').length}</div>
                <div className="text-slate-400 text-xs">Sources actives</div>
              </div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/15 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">{sources.filter(s => s.statut === 'warning').length}</div>
                <div className="text-slate-400 text-xs">Attention</div>
              </div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{sources.filter(s => s.statut === 'error').length}</div>
                <div className="text-slate-400 text-xs">Erreur</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-sm">Sources de données configurées</h2>
                {lastRefreshAll && (
                  <p className="text-slate-500 text-xs mt-0.5">Dernier rafraîchissement global : {lastRefreshAll}</p>
                )}
              </div>
              <button
                onClick={refreshAll}
                disabled={refreshing !== null}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 disabled:opacity-50 text-green-300 border border-green-500/30 rounded-lg text-xs font-medium transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing === 'all' ? 'animate-spin' : ''}`} />
                {refreshing === 'all' ? 'Rafraîchissement...' : 'Rafraîchir tout'}
              </button>
            </div>
            <div className="divide-y divide-slate-700/50">
              {sources.map(source => {
                const s = statutStyle[source.statut];
                return (
                  <div key={source.nom} className="flex items-center justify-between px-5 py-4 hover:bg-slate-700/20 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium">{source.nom}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{source.indicateurs}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <div className="text-right hidden lg:block">
                        <div className="text-slate-400 text-xs">{source.frequence}</div>
                        <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {source.dernierMaj}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${s.badge}`}>{s.label}</span>
                      <button
                        onClick={() => simulateRefresh(source.nom)}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <RefreshCw className={`w-4 h-4 ${refreshing === source.nom ? 'animate-spin text-green-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Workflows tab */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm">Workflows automatisés</h2>
              <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                <Zap className="w-3.5 h-3.5" /> Déclencher manuellement
              </button>
            </div>
            <div className="divide-y divide-slate-700/50">
              {workflows.map(workflow => {
                const s = statutStyle[workflow.statut];
                return (
                  <div key={workflow.nom} className="flex items-center justify-between px-5 py-4 hover:bg-slate-700/20">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div>
                        <div className="text-white text-sm font-medium">{workflow.nom}</div>
                        <div className="flex items-center gap-4 mt-0.5 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Dernier : {workflow.dernierExec}</span>
                          <span className="hidden lg:flex items-center gap-1"><Calendar className="w-3 h-3" />Prochain : {workflow.prochaine}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-slate-500 text-xs">{workflow.duree}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${s.badge}`}>{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-semibold text-sm">Workflow en erreur</p>
                <p className="text-amber-200/70 text-xs mt-1">
                  Le workflow "Notification équipe" a expiré lors de la dernière exécution. Vérifiez la configuration SMTP.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System tab */}
      {activeTab === 'systeme' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Établissements en base', value: statsGlobales.nb_etablissements_couverts, sub: `/ ${statsGlobales.nb_etablissements} total`, icon: Database, color: 'green' },
              { label: 'Diagnostics générés', value: statsGlobales.diagnostics_generes, sub: 'ce mois', icon: BarChart2, color: 'blue' },
              { label: 'Rapports produits', value: statsGlobales.rapports_produits, sub: 'depuis le lancement', icon: Activity, color: 'purple' },
              { label: 'Complétude données', value: '82%', sub: 'par département', icon: Shield, color: 'amber' },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
                <div className={`w-9 h-9 bg-${color}-500/15 rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-4.5 h-4.5 text-${color}-400`} />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{label}</div>
                <div className="text-slate-500 text-xs">{sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 space-y-4">
            <h2 className="text-white font-semibold text-sm">Configuration API</h2>
            <div className="space-y-3">
              {[
                { label: 'Claude API (Anthropic)', key: 'ANTHROPIC_API_KEY', statut: process.env.NEXT_PUBLIC_HAS_API_KEY ? 'ok' : 'non configuré', desc: 'Analyse IA, génération de rapports' },
                { label: 'France Travail API', key: 'FRANCE_TRAVAIL_CLIENT_ID', statut: 'ok', desc: 'Offres emploi agriculture, métiers en tension' },
                { label: 'INSEE Open Data', key: 'API publique', statut: 'ok', desc: 'Population, statistiques territoriales' },
                { label: 'API Découpage Administratif', key: 'API publique', statut: 'ok', desc: 'Communes, EPCI, départements, régions' },
                { label: 'Géoportail IGN (WMS)', key: 'API publique', statut: 'ok', desc: 'Couches géographiques, limites admin.' },
              ].map(({ label, key, statut, desc }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <div>
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                    <span className="text-slate-500 text-xs ml-2">{key}</span>
                    {desc && <p className="text-slate-500 text-xs mt-0.5">{desc}</p>}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ml-4 ${
                    statut === 'ok' ? 'bg-green-500/15 text-green-300 border-green-500/30' :
                    'bg-red-500/15 text-red-300 border-red-500/30'
                  }`}>
                    {statut === 'ok' ? '✓ Configuré' : 'non configuré'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4 text-xs">
              <p className="text-slate-400 font-semibold mb-2">Variables d'environnement (.env.local) :</p>
              <code className="block bg-slate-900 rounded p-3 text-slate-300 space-y-1 leading-5">
                <span className="block text-green-400"># IA Anthropic Claude</span>
                <span className="block">ANTHROPIC_API_KEY=sk-ant-votre-cle-api</span>
                <span className="block mt-2 text-green-400"># France Travail – Emploi &amp; Offres</span>
                <span className="block">FRANCE_TRAVAIL_CLIENT_ID=PAR_xxx...</span>
                <span className="block">FRANCE_TRAVAIL_CLIENT_SECRET=votre-secret</span>
              </code>
              <div className="flex gap-4 mt-2 text-slate-500">
                <span>Claude : <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">console.anthropic.com</a></span>
                <span>France Travail : <a href="https://francetravail.io" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">francetravail.io</a></span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3">Informations système</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { l: 'Version OATIA', v: '1.0.0' },
                { l: 'Dernière mise à jour', v: statsGlobales.derniere_maj },
                { l: 'Modèle IA', v: 'Claude Opus 4.6' },
                { l: 'Référentiel territorial', v: 'INSEE 2024' },
                { l: 'Framework', v: 'Next.js 14' },
                { l: 'Référent', v: 'Bruno Terrasson – MASA/DGER' },
              ].map(({ l, v }) => (
                <div key={l} className="bg-slate-700/40 rounded-lg p-2.5">
                  <div className="text-slate-500">{l}</div>
                  <div className="text-slate-200 font-medium mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
