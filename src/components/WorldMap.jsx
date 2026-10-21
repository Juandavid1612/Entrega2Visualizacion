import React, { useState } from 'react';
import { REGIONS, regionColor } from '../utils/regions';

export default function WorldMap({ selectedRegion }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative w-full h-[520px] bg-[#080B10] rounded-xl border border-[#212A3B] overflow-hidden flex items-center justify-center shadow-2xl">
      {/* Cuadrícula cartográfica de fondo y gradiente ambiental */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/80 via-transparent to-[#0B0E14]/40 pointer-events-none" />

      {/* Rosa de los Vientos / Compás Cartográfico */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col items-center pointer-events-none opacity-60">
        <div className="w-10 h-10 border border-[#334155] rounded-full bg-[#131822]/80 backdrop-blur flex items-center justify-center font-mono text-xs font-bold text-[#ECF2F8] shadow-md">
          N
        </div>
        <span className="text-[10px] font-mono text-[#8B949E] mt-1 tracking-widest">COMPÁS</span>
      </div>

      {/* Controles de Zoom Integrados */}
      <div className="absolute top-6 left-6 z-10 flex flex-col bg-[#131822]/90 backdrop-blur-md border border-[#212A3B] rounded-lg shadow-lg overflow-hidden">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.25, 2))}
          className="w-9 h-9 flex items-center justify-center text-[#ECF2F8] hover:bg-[#1F2937] transition-colors border-b border-[#212A3B] font-bold text-base"
          title="Acercar"
        >
          +
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.75))}
          className="w-9 h-9 flex items-center justify-center text-[#ECF2F8] hover:bg-[#1F2937] transition-colors font-bold text-base"
          title="Alejar"
        >
          −
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="w-9 h-9 flex items-center justify-center text-[10px] font-mono text-[#8B949E] hover:bg-[#1F2937] transition-colors border-t border-[#212A3B]"
          title="Reiniciar zoom"
        >
          1:1
        </button>
      </div>

      {/* Indicador contextual interactivo */}
      <div className="absolute bottom-6 right-6 z-10 bg-[#131822]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#212A3B] text-xs font-mono text-[#8B949E] flex items-center gap-2.5 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
        <span>Mapa interactivo de regiones continentales</span>
      </div>

      {/* Contenedor SVG del Mapa */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Aquí se renderiza tu SVG / Polígonos de regiones existentes con los nuevos estilos mejorados */}
        <div className="relative text-center">
          <p className="font-mono text-xs text-[#8B949E] tracking-wider mb-2">PROYECCIÓN CARTOGRÁFICA ACTIVA</p>
          <div className="flex gap-6 justify-center items-center">
            {["Rajira", "Arpenia", "Mareina"].map((reg) => {
              const isSelected = selectedRegion === "Todas" || selectedRegion === reg;
              const col = regionColor(reg);
              return (
                <div 
                  key={reg}
                  className={`p-6 rounded-xl border transition-all duration-300 flex flex-col items-center ${
                    isSelected 
                      ? "bg-[#131822] shadow-xl scale-105" 
                      : "bg-[#0B0E14]/60 opacity-40 hover:opacity-70"
                  }`}
                  style={{ borderColor: isSelected ? col : '#212A3B' }}
                >
                  <span className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: col }} />
                  <span className="font-serif font-bold text-lg text-[#ECF2F8]">{reg}</span>
                  <span className="text-xs font-mono text-[#8B949E] mt-1">Territorio Registrado</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}