import React from 'react';
import { REGIONS } from '../utils/regions';

export default function Sidebar({ selectedRegion, setSelectedRegion, activeView, setActiveView }) {
  return (
    <aside className="w-64 bg-[#0B0E14] border-r border-[#1F2937] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5 select-none">
      <div>
        {/* Logo / Badge del Atlas */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-9 h-9 rounded-lg bg-[#1F2937] border border-[#374151] flex items-center justify-center text-[#ECF2F8] font-bold text-lg shadow-inner">
            ▲
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#ECF2F8] leading-tight">ATLAS</h1>
            <p className="text-[11px] font-mono text-[#8B949E] tracking-wider uppercase">Registro Continental</p>
          </div>
        </div>

        {/* Sección 1: Selección de Región */}
        <div className="mb-8">
          <p className="text-[11px] font-mono text-[#8B949E] uppercase tracking-wider mb-3 px-2">
            Regiones del Mundo
          </p>
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => { setSelectedRegion("Todas"); setActiveView("dashboard"); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedRegion === "Todas"
                  ? "bg-[#1F2937] text-white font-semibold shadow-sm border border-[#374151]"
                  : "text-[#8B949E] hover:bg-[#131822] hover:text-[#ECF2F8]"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
              Vista Panorama (Todas)
            </button>

            {Object.keys(REGIONS).map((reg) => {
              const info = REGIONS[reg];
              const isSelected = selectedRegion === reg;
              return (
                <button
                  key={reg}
                  onClick={() => { setSelectedRegion(reg); setActiveView("dashboard"); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#131822] text-white border border-[#212A3B]"
                      : "text-[#8B949E] hover:bg-[#131822] hover:text-[#ECF2F8]"
                  }`}
                  style={{
                    borderLeft: isSelected ? `4px solid ${info.color}` : '4px solid transparent'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
                    <span>{reg}</span>
                  </div>
                  {isSelected && <span className="text-xs text-[#8B949E]">Activa</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sección 2: Navegación de Contenido Extra */}
        <div>
          <p className="text-[11px] font-mono text-[#8B949E] uppercase tracking-wider mb-3 px-2">
            Compendio
          </p>
          <button
            onClick={() => setActiveView("historia")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeView === "historia"
                ? "bg-[#1F2937] text-white font-semibold border border-[#374151]"
                : "text-[#8B949E] hover:bg-[#131822] hover:text-[#ECF2F8]"
            }`}
          >
            <span>📜</span>
            <span>Historia y Lore</span>
          </button>
        </div>
      </div>

      {/* Footer del Sidebar */}
      <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs text-[#8B949E]">
        <span className="font-mono">v2.4 — GitHub Pages</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
        </div>
      </div>
    </aside>
  );
}