import React, { useState } from 'react';
import { REGIONS } from '../utils/regions';

export default function InteractiveMap({ selectedRegion, setSelectedRegion, geoJsonData }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Conversión simple de GeoJSON a SVG path (Bounding box simplificado)
  const projectCoords = (coords) => {
    return coords.map(([lon, lat]) => {
      // Mapeo simple de coordenadas a rango SVG (800x500)
      const x = ((lon + 130) / 240) * 700 + 50;
      const y = ((50 - lat) / 120) * 400 + 50;
      return `${x},${y}`;
    }).join(" L ");
  };

  return (
    <div className="relative w-full h-[480px] bg-[#080B10] rounded-xl border border-[#1F2937] overflow-hidden flex items-center justify-center shadow-inner">
      {/* Malla de Fondo / Grilla Cartográfica */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#8B949E 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Rosa de los Vientos / Compás */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center opacity-60 pointer-events-none">
        <div className="w-10 h-10 border border-[#374151] rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#8B949E]">
          N
        </div>
        <span className="text-[10px] font-mono text-[#8B949E] mt-1">COMPÁS</span>
      </div>

      {/* Controles Flotantes de Zoom */}
      <div className="absolute top-4 left-4 z-10 flex flex-col bg-[#131822]/90 backdrop-blur border border-[#212A3B] rounded-lg shadow-lg overflow-hidden">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.25, 2))}
          className="w-8 h-8 flex items-center justify-center text-[#ECF2F8] hover:bg-[#1F2937] transition-colors border-b border-[#212A3B] font-bold"
        >
          +
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.75))}
          className="w-8 h-8 flex items-center justify-center text-[#ECF2F8] hover:bg-[#1F2937] transition-colors font-bold"
        >
          −
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="w-8 h-8 flex items-center justify-center text-[10px] text-[#8B949E] hover:bg-[#1F2937] transition-colors border-t border-[#212A3B] font-mono"
        >
          RESET
        </button>
      </div>

      {/* Indicador de ayuda */}
      <div className="absolute bottom-4 right-4 z-10 bg-[#131822]/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#212A3B] text-[11px] font-mono text-[#8B949E] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
        Haz clic en una región para seleccionarla
      </div>

      {/* Canvas SVG Interactivo */}
      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {geoJsonData?.features?.map((feature) => {
          const name = feature.properties.name;
          const regInfo = REGIONS[name];
          const isSelected = selectedRegion === "Todas" || selectedRegion === name;
          const isHovered = hoveredRegion === name;
          const d = `M ${projectCoords(feature.geometry.coordinates[0])} Z`;

          return (
            <g key={name} className="cursor-pointer transition-all duration-200" onClick={() => setSelectedRegion(name)}>
              <path
                d={d}
                fill={regInfo?.color ?? "#374151"}
                fillOpacity={isSelected ? (isHovered ? 0.85 : 0.6) : 0.15}
                stroke={regInfo?.color ?? "#8B949E"}
                strokeWidth={isSelected ? (isHovered ? 3 : 2) : 1}
                strokeDasharray={isSelected ? "none" : "4 4"}
                filter={isHovered ? "url(#glow)" : "none"}
                onMouseEnter={() => setHoveredRegion(name)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="transition-all duration-300"
              />
              {/* Etiqueta de la Región en el Mapa */}
              <text
                x={
                  name === "Rajira" ? 220 :
                  name === "Arpenia" ? 580 : 380
                }
                y={
                  name === "Rajira" ? 260 :
                  name === "Arpenia" ? 220 : 150
                }
                fill="#ECF2F8"
                fontSize="13"
                fontWeight="bold"
                fontFamily="IBM Plex Sans, sans-serif"
                textAnchor="middle"
                className="pointer-events-none select-none drop-shadow-md"
                opacity={isSelected ? 1 : 0.4}
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}