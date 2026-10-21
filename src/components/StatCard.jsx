import React from 'react';
import { regionColor, REGIONS } from '../utils/regions';
import { formatNumber } from '../utils/format';

export default function StatCard({ region, color, capital, area, population, delay = 0 }) {
  const regInfo = REGIONS[region] || {};
  const accentColor = color || regionColor(region);

  return (
    <div 
      className="relative group bg-[#131822] border border-[#212A3B] hover:border-[#334155] rounded-xl p-6 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {/* Resplandor ambiental sutil superior basado en el color de la región */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-80 transition-all duration-300 group-hover:opacity-100"
        style={{ backgroundColor: accentColor }}
      />
      
      {/* Fondo de brillo radial muy suave */}
      <div 
        className="absolute -right-12 -top-12 w-32 h-32 rounded-full pointer-events-none opacity-10 transition-opacity duration-500 group-hover:opacity-20 blur-2xl"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Cabecera de la Tarjeta */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span 
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: accentColor }}
            />
            <h3 className="font-serif font-bold text-xl text-[#ECF2F8] tracking-wide">
              {region}
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#171F2C] border border-[#212A3B] text-[#8B949E]">
            REGISTRO ACTIVO
          </span>
        </div>

        {/* Capital */}
        <div className="text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <span>Capital:</span>
          <span className="text-[#ECF2F8] font-medium capitalize">{capital || regInfo.capital || "—"}</span>
        </div>

        {/* Cifra Principal de Población */}
        <div className="my-3">
          <span className="text-[11px] font-mono text-[#8B949E] uppercase tracking-wider block mb-1">
            Habitantes Registrados
          </span>
          <div className="font-mono text-3xl font-bold text-[#ECF2F8] tracking-tight">
            {formatNumber(population)}
          </div>
        </div>
      </div>

      {/* Footer de la Tarjeta: Superficie y Mini-Tendencia */}
      <div className="pt-4 mt-4 border-t border-[#212A3B] flex items-center justify-between">
        <div className="text-xs font-mono text-[#8B949E]">
          Superficie: <span className="text-[#ECF2F8] font-semibold">{area ? `${area} km²` : `${regInfo.area || "—"} km²`}</span>
        </div>

        {/* Minigráfico decorativo (Sparkline) */}
        <div className="flex items-end gap-1 h-5 opacity-60 group-hover:opacity-100 transition-opacity">
          {[40, 65, 50, 75, 60, 90].map((val, idx) => (
            <span 
              key={idx} 
              className="w-1 rounded-t transition-all duration-300"
              style={{ 
                height: `${val}%`, 
                backgroundColor: accentColor 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}