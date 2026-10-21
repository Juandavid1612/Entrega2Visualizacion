import React from 'react';
import { REGIONS } from '../utils/regions';
import { BookOpen, Shield, Crown, Compass } from 'lucide-react';

export default function HistoryCompendium() {
  return (
    <div className="max-w-4xl mx-auto py-6 flex flex-col gap-8 animate-fadeIn">
      <div className="border-b border-[#30363D] pb-6">
        <div className="flex items-center gap-2 text-[#FF3366] text-xs font-mono uppercase tracking-widest mb-1">
          <BookOpen className="w-4 h-4" /> Compendio Histórico
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#F0F6FC]">Crónicas del Continente</h2>
        <p className="text-[#8B949E] text-sm mt-2">
          Antecedentes geopolíticos, origen de los conflictos y evolución territorial de las tres grandes naciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(REGIONS).map(([name, info]) => (
          <div 
            key={name}
            className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#8B949E] transition-all"
            style={{ borderTop: `4px solid ${info.color}` }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5" style={{ color: info.color }} />
                  {name}
                </h3>
              </div>
              <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
                {info.lore}
              </p>
            </div>
            <div className="pt-4 border-t border-[#30363D] text-xs font-mono text-[#8B949E] flex items-center justify-between">
              <span>Capital: {info.capital}</span>
              <Compass className="w-4 h-4 opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}