import React from 'react';

// Símbolo 🔴 Rajira: Escudo con hoja de lanza / diamante salvaje
export function RajiraIcon({ className = "w-5 h-5", color = "#FF3366" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L19 7V13C19 17.5 15.5 21 12 22C8.5 21 5 17.5 5 13V7L12 2Z" 
        fill={color} 
        fillOpacity="0.25" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 6L15 11L12 18L9 11L12 6Z" 
        fill={color}
      />
    </svg>
  );
}

// Símbolo 🟢 Arpenia: Hoja de bosque / cristal botánico urbano
export function ArpeniaIcon({ className = "w-5 h-5", color = "#00E676" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C12 2 19 8 19 14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14C5 8 12 2 12 2Z" 
        fill={color} 
        fillOpacity="0.2" 
        stroke={color} 
        strokeWidth="1.8"
      />
      <path 
        d="M12 6V18M12 12L16 9M12 15L16 12M12 12L8 9M12 15L8 12" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
      />
    </svg>
  );
}

// Símbolo 🟡 Mareina: Rosa de los vientos / prisma brújula marítima
export function MareinaIcon({ className = "w-5 h-5", color = "#FFB300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <path 
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
        fill={color}
      />
    </svg>
  );
}

// Helper dinámico según nombre de la región
export function RegionSymbol({ region, className = "w-5 h-5" }) {
  if (region === "Rajira") return <RajiraIcon className={className} color="#FF3366" />;
  if (region === "Arpenia") return <ArpeniaIcon className={className} color="#00E676" />;
  if (region === "Mareina") return <MareinaIcon className={className} color="#FFB300" />;
  
  // Ícono por defecto para "Todas / Panorama Global"
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 22,22 2,22" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}