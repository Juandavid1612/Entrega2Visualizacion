import React, { useState } from 'react';
import { Sparkles, Eye, Layers, GitCommit } from 'lucide-react';

// Importación directa de tus imágenes desde assets
import imgPlanta from '../assets/flor.png';
import imgAnatomia from '../assets/partes.png';
import imgRaices from '../assets/raices.png';

export default function FloraViewer() {
  const [activeTab, setActiveTab] = useState('planta'); // 'planta', 'anatomia', 'raices'

  // Diccionario con las imágenes y textos descriptivos correspondientes
  const floraData = {
    planta: {
      title: "La planta completa en su ecosistema subterráneo",
      desc: "Vista general de la planta",
      image: imgPlanta
    },
    anatomia: {
      title: "Anatomía de la Corola y Estambres Neuroconductores",
      desc: "Detalle de los organos que dispersan las esporas que inhiben la toxina arpeniana.",
      image: imgAnatomia
    },
    raices: {
      title: "Sistema Radicular y Red Subterránea",
      desc: "Vista general bajo tierra, interconecta varias flores mediante enormes raíces que se extiendes por hectareas.",
      image: imgRaices
    }
  };

  const current = floraData[activeTab];

  return (
    <div className="max-w-4xl mx-auto py-6 flex flex-col gap-8 animate-fadeIn text-[#F0F6FC]">
      
      {/* Cabecera de la Infografía */}
      <div className="border-b border-[#30363D] pb-6">
        <div className="flex items-center gap-2 text-[#00E676] text-xs font-mono uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4" /> Archivo Botánico Clasificado
        </div>
        
        {/* Nombre en azul de la flor como solicitaste */}
        <h2 className="text-4xl font-serif font-bold text-[#38BDF8] mt-1 drop-shadow-md">
          Flor de Rajira
        </h2>

        {/* Pequeño texto descriptivo de las propiedades de la planta */}
        <p className="text-[#8B949E] text-sm mt-3 leading-relaxed max-w-2xl">
          Órgano reproductor y sensorial capaz de detectar impulsos bioeléctricos, desencadenando compuestos neuroactivos que restauran la empatía y neutralizan los efectos de la toxina arpeniana.
        </p>
      </div>

      {/* Visualizador Principal con Botones Interactivos */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 shadow-2xl flex flex-col items-center">
        
        {/* Botones de navegación del visualizador */}
        <div className="flex flex-wrap gap-3 mb-8 bg-[#0D1117] p-1.5 rounded-xl border border-[#30363D]">
          {[
            { id: 'planta', label: 'La planta', icon: Eye },
            { id: 'anatomia', label: 'Anatomía', icon: Layers },
            { id: 'raices', label: 'Raíces', icon: GitCommit },
          ].map(btn => {
            const Icon = btn.icon;
            const isActive = activeTab === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveTab(btn.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-[#38BDF8] text-[#0D1117] font-bold shadow-lg" 
                    : "text-[#8B949E] hover:text-white hover:bg-[#161B22]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenedor de la ilustración (Fondo oscuro con truco para eliminar el blanco de la imagen) */}
        <div className="relative w-full h-[420px] bg-[#0B0E14] border border-[#21262D] rounded-xl flex items-center justify-center overflow-hidden p-4 shadow-inner">
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />
          
          <img 
            src={current.image} 
            alt={current.title}
            className="max-h-[370px] object-contain transition-all duration-500 hover:scale-105"
            style={{ 
              // Esto hace que el fondo blanco de las ilustraciones desaparezca de forma limpia sobre el fondo oscuro
              mixBlendMode: 'screen', 
              filter: 'contrast(1.15) brightness(1.05)' 
            }}
          />
        </div>

        {/* Texto descriptivo de la ilustración activa */}
        <div className="mt-6 text-center max-w-xl">
          <h4 className="font-serif font-bold text-lg text-white mb-1">{current.title}</h4>
          <p className="text-xs text-[#8B949E] leading-relaxed">{current.desc}</p>
        </div>

      </div>

    </div>
  );
}