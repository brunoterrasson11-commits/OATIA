'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
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
};

const typeIcons = {
  EPLEFPA: '🌿',
  MFR: '🏡',
  CFPPA: '📚',
  CNEAP: '✝️',
  CFA:   '🎓',
};

function createCustomIcon(type, selected = false) {
  const color = typeColors[type] || '#94a3b8';
  const size = selected ? 44 : 36;
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 3px solid ${selected ? 'white' : 'rgba(255,255,255,0.3)'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      display: flex; align-items: center; justify-content: center;
    ">
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

// Color by score
function getScoreColor(value, max = 100) {
  const ratio = value / max;
  if (ratio >= 0.7) return '#22c55e';
  if (ratio >= 0.5) return '#84cc16';
  if (ratio >= 0.35) return '#f59e0b';
  return '#ef4444';
}

function getVulnerabiliteColor(score) {
  if (score <= 3) return '#22c55e';
  if (score <= 5) return '#84cc16';
  if (score <= 7) return '#f59e0b';
  return '#ef4444';
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
  indicateurActif = 'score_attractivite',
}) {
  const [geoData, setGeoData] = useState(null);

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
      case 'score_attractivite': val = ind.score_attractivite; break;
      case 'indice_dynamisme': val = ind.indice_dynamisme; break;
      case 'score_vulnerabilite': val = (10 - ind.score_vulnerabilite) * 10; break;
      case 'part_bio': val = ind.part_bio * 5; break;
      default: val = ind.score_attractivite;
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
    if (ind) {
      layer.bindTooltip(
        `<div style="background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px;color:#e2e8f0;min-width:180px">
          <strong style="color:white;font-size:13px">${ind.nom}</strong>
          <br/><span style="color:#94a3b8;font-size:11px">${ind.region}</span>
          <hr style="border-color:#334155;margin:6px 0"/>
          <div style="font-size:11px;space-y:2px">
            <div>🌱 Dynamisme : <strong style="color:#22c55e">${ind.indice_dynamisme}/100</strong></div>
            <div>🏆 Attractivité : <strong style="color:#3b82f6">${ind.score_attractivite}/100</strong></div>
            <div>⚠️ Vulnérabilité : <strong style="color:#f59e0b">${ind.score_vulnerabilite}/10</strong></div>
            <div>🌿 Part BIO : <strong>${ind.part_bio}%</strong></div>
          </div>
        </div>`,
        { sticky: true, opacity: 1, className: '' }
      );
    }
  };

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
          icon={createCustomIcon(etab.type, selectedEtab?.id === etab.id)}
          eventHandlers={{
            click: () => {
              if (onSelectEtablissement) onSelectEtablissement(etab);
            }
          }}
        >
          <Popup maxWidth={280}>
            <div style={{ color: '#e2e8f0', fontSize: '13px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px', color: 'white' }}>
                {typeIcons[etab.type]} {etab.nom}
              </div>
              <div style={{ color: typeColors[etab.type], fontWeight: 600, fontSize: '11px', marginBottom: '8px' }}>
                {etab.type} · {etab.statut}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '11px' }}>📍 {etab.departement}</div>
              <hr style={{ borderColor: '#334155', margin: '8px 0' }} />
              <div style={{ fontSize: '12px' }}>
                <div>👥 <strong style={{ color: 'white' }}>{etab.effectifs_total}</strong> apprenants</div>
                <div style={{ marginTop: '3px' }}>📊 Remplissage : <strong style={{ color: '#22c55e' }}>{etab.taux_remplissage}%</strong></div>
                <div style={{ marginTop: '3px' }}>💼 Insertion : <strong style={{ color: '#3b82f6' }}>{etab.taux_insertion}%</strong></div>
              </div>
              <hr style={{ borderColor: '#334155', margin: '8px 0' }} />
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                <strong style={{ color: '#e2e8f0' }}>Formations :</strong>
                <ul style={{ marginTop: '4px', paddingLeft: '0', listStyle: 'none' }}>
                  {etab.formations.map((f, i) => (
                    <li key={i} style={{ marginTop: '2px' }}>• {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
