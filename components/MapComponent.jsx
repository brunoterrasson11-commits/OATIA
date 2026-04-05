'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { indicateurs } from '@/lib/data';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const typeColors = {
  EPLEFPA: '#22c55e',
  MFR: '#3b82f6',
  CFPPA: '#f59e0b',
  CNEAP: '#e879f9',
  CFA:   '#38bdf8',
  UNREP: '#fb7185',
  'Bachelor Agro': '#f97316',
};

const mentionColors = {
  GAT:  '#22c55e',
  EAMA: '#f97316',
  AAD:  '#3b82f6',
  ET:   '#a855f7',
  STAF: '#ec4899',
  SRNA: '#06b6d4',
};

// ─── Indices calculés à partir des indicateurs territoriaux ──────────────────
// Méthodologie France Travail : domaine D (Vente), domaine K (SAPAT)

/**
 * Indice Vente & Commerce (0-100)
 * Reflète l'opportunité dans le commerce/vente d'un département.
 * Corrélé à : attractivité, faible chômage, dynamisme économique, croissance pop.
 */
function computeIndiceVente(ind) {
  if (!ind) return 40;
  const attractif  = (ind.score_attractivite || 50) * 0.50;
  const emploi     = Math.max(0, (10 - (ind.taux_chomage || 8)) * 3.2);
  const dynamisme  = (ind.indice_dynamisme || 50) * 0.12;
  const popGrowth  = Math.max(0, (ind.evolution_pop_10ans || 0) * 1.5);
  return Math.min(100, Math.max(5, Math.round(attractif + emploi + dynamisme + popGrowth)));
}

/**
 * Indice Services aux personnes et aux territoires – SAPAT (0-100)
 * Reflète le besoin en services sociaux et à la personne sur le territoire.
 * Corrélé à : vieillissement exploitants, vulnérabilité rurale, déclin démographique.
 */
function computeIndiceSAPAT(ind) {
  if (!ind) return 40;
  const aging    = (ind.part_exploitants_55plus || 40) * 0.80;
  const vuln     = (ind.score_vulnerabilite    || 5)  * 5.50;
  const decline  = Math.max(0, -(ind.evolution_pop_10ans || 0) * 2.5);
  return Math.min(100, Math.max(10, Math.round(aging + vuln + decline)));
}

/**
 * Score attractivité enrichi — intègre vente + SAPAT
 * Un territoire avec une diversification vente ET sapat forte est plus résilient.
 */
function computeAttractiviteEnrichi(ind) {
  if (!ind) return 0;
  const vente = computeIndiceVente(ind);
  const sapat = computeIndiceSAPAT(ind);
  // Bonus diversification : max 15 pts si vente ET sapat > 60
  const diversBonus = Math.min(15, Math.round((vente + sapat) / 13.5));
  return Math.min(100, Math.round(ind.score_attractivite * 0.80 + diversBonus));
}

/**
 * Score vulnérabilité ajusté — intègre vente + SAPAT
 * La diversification vente réduit la vulnérabilité.
 * Un fort besoin SAPAT non couvert (ruralité + vieillissement + faible attractivité) l'augmente.
 */
function computeVulnerabiliteAjustee(ind) {
  if (!ind) return 5;
  const vente = computeIndiceVente(ind);
  const sapat = computeIndiceSAPAT(ind);
  // Réduction par la diversification économique (vente) : jusqu'à -1.5 pt
  const venteReduction = (vente / 100) * 1.5;
  // Aggravation si besoins SAPAT élevés ET attractivité faible (territoire enclavé)
  const sapatRisk = (sapat > 60 && ind.score_attractivite < 50)
    ? ((sapat - 60) / 100) * 0.8
    : 0;
  return Math.min(10, Math.max(0,
    Math.round((ind.score_vulnerabilite - venteReduction + sapatRisk) * 10) / 10
  ));
}

// ─── Couleurs par score ───────────────────────────────────────────────────────
function getScoreColor(value, max = 100) {
  const ratio = value / max;
  if (ratio >= 0.7) return '#22c55e';
  if (ratio >= 0.5) return '#84cc16';
  if (ratio >= 0.35) return '#f59e0b';
  return '#ef4444';
}

function createCustomIcon(type, selected = false, isBachelor = false) {
  const color = isBachelor ? '#f97316' : (typeColors[type] || '#94a3b8');
  const size = selected ? 44 : 36;
  const ring = isBachelor
    ? `box-shadow: 0 0 0 3px rgba(249,115,22,0.4), 0 3px 10px rgba(0,0,0,0.4);`
    : `box-shadow: 0 3px 10px rgba(0,0,0,0.4);`;
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 3px solid ${selected ? 'white' : 'rgba(255,255,255,0.3)'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      ${ring}
      display: flex; align-items: center; justify-content: center;
    ">
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || 6);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({
  etablissements = [],
  selectedEtab = null,
  selectedDept,
  onSelectEtablissement,
  onSelectDept,
  indicateurActif = 'score_attractivite',
  filtreType = 'Tous',
}) {
  const [geoData, setGeoData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson')
      .then(r => r.json())
      .then(data => setGeoData(data))
      .catch(() => setGeoData(null));
  }, []);

  const styleFeature = (feature) => {
    const code = feature.properties.code;
    const ind = indicateurs[code];
    if (!ind) return {
      fillColor: '#1e293b',
      weight: 1,
      color: '#334155',
      fillOpacity: 0.6,
    };

    let val;
    switch (indicateurActif) {
      // Couches enrichies (intègrent Vente + SAPAT)
      case 'score_attractivite':
        val = computeAttractiviteEnrichi(ind);
        break;
      case 'score_vulnerabilite':
        val = (10 - computeVulnerabiliteAjustee(ind)) * 10;
        break;
      // Couches existantes
      case 'indice_dynamisme':
        val = ind.indice_dynamisme;
        break;
      case 'part_bio':
        val = ind.part_bio * 5;
        break;
      // Nouvelles couches filières
      case 'vente':
        val = computeIndiceVente(ind);
        break;
      case 'sapat':
        val = computeIndiceSAPAT(ind);
        break;
      default:
        val = computeAttractiviteEnrichi(ind);
    }

    const isSelected = selectedDept === code;
    return {
      fillColor: getScoreColor(val),
      weight: isSelected ? 3 : 1,
      color: isSelected ? '#fff' : '#334155',
      fillOpacity: 0.65,
    };
  };

  const onEachFeature = (feature, layer) => {
    const code = feature.properties.code;
    const ind = indicateurs[code];

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 2, color: '#94a3b8', fillOpacity: 0.85 });
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature(feature));
      },
      click: () => {
        if (!ind || !onSelectDept) return;
        onSelectDept(code, {
          ...ind,
          attractEnrichi: computeAttractiviteEnrichi(ind),
          vulnAjustee:    computeVulnerabiliteAjustee(ind),
          indiceVente:    computeIndiceVente(ind),
          indiceSAPAT:    computeIndiceSAPAT(ind),
        });
      },
    });
  };

  if (!isMounted) return null;

  return (
    <MapContainer
      center={[46.5, 2.5]}
      zoom={6}
      style={{ height: '100%', width: '100%', background: '#0f172a' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {geoData && (
        <GeoJSON
          key={`${indicateurActif}-${selectedDept}`}
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      )}

      {etablissements.map(etab => (
        <Marker
          key={etab.id}
          position={etab.coordonnees}
          icon={createCustomIcon(etab.type, selectedEtab?.id === etab.id, filtreType === 'Bachelor Agro')}
          eventHandlers={{
            click: () => {
              if (onSelectEtablissement) onSelectEtablissement(etab);
            }
          }}
        />
      ))}
    </MapContainer>
  );
}
