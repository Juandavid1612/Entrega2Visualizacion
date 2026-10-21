import React, { useState } from 'react';

// Masas insulares independientes con formas costeras reales y detalladas
const CONTINENTAL_MAPS = {
  Mareina: {
    path: "M 400,70 L 413.6,67.8 L 419.1,58.1 L 440,60 L 456.3,72.0 L 463.6,79.6 L 480,80 L 490.2,85.0 L 494.2,97.6 L 500,110 L 488.2,127.9 L 494.1,132.4 L 480,150 L 466.7,161.7 L 470.3,166.4 L 460,180 L 453.0,190.3 L 432.8,194.2 L 430,210 L 411.7,214.6 L 403.7,204.6 L 390,200 L 383.8,190.7 L 376.6,184.9 L 360,170 L 355.1,151.0 L 360.6,134.2 L 350,120 L 362.5,115.3 L 363.9,106.8 L 370,90 L 373.6,77.0 L 393.2,82.9 Z",
    capitalPos: { x: 430, y: 135 },
    color: "#FFB300"
  },
  Rajira: {
    path: "M 260,260 L 275.6,252.9 L 307.6,261.2 L 320,250 L 341.3,261.1 L 348.3,263.8 L 360,280 L 371.6,289.0 L 381.2,307.5 L 380,320 L 372.4,330.1 L 365.7,359.3 L 360,370 L 345.2,387.2 L 328.8,402.6 L 320,410 L 304.2,408.4 L 285.6,420.7 L 270,420 L 252.8,403.2 L 242.8,390.8 L 220,380 L 223.3,368.2 L 211.5,341.4 L 210,330 L 211.5,305.8 L 215.9,293.8 L 230,280 L 233.6,273.8 L 248.5,259.9 Z",
    capitalPos: { x: 290, y: 335 },
    color: "#FF3366"
  },
  Arpenia: {
    path: "M 480,260 L 504.0,249.8 L 520.8,251.6 L 540,240 L 561.9,245.6 L 575.0,251.1 L 600,260 L 609.9,274.7 L 629.2,281.0 L 640,300 L 636.9,317.5 L 649.4,328.9 L 650,350 L 629.0,360.7 L 627.2,383.9 L 610,400 L 583.3,407.5 L 562.5,407.3 L 550,410 L 541.3,388.8 L 523.9,376.4 L 500,370 L 488.5,353.5 L 477.0,339.4 L 470,320 L 473.4,302.1 L 469.9,292.1 L 480,280 L 477.7,268.6 L 476.9,270.0 Z",
    capitalPos: { x: 555, y: 330 },
    color: "#00E676"
  }
};

export default function WorldMap({ selectedRegion, setSelectedRegion }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleRegionClick = (name, e) => {
    e.stopPropagation();
    if (setSelectedRegion) {
      setSelectedRegion(name);
    }
  };

  return (
    <div className="relative w-full h-[540px] bg-[#070A0F] rounded-xl border border-[#21262D] overflow-hidden flex items-center justify-center shadow-2xl select-none">
      
      {/* Grilla cartográfica de fondo */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#30363D 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Controles de Zoom */}
      <div className="absolute top-5 left-5 z-20 flex flex-col bg-[#161B22]/90 backdrop-blur-md border border-[#30363D] rounded-lg shadow-xl overflow-hidden">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
          className="w-9 h-9 flex items-center justify-center text-[#F0F6FC] hover:bg-[#21262D] transition-colors border-b border-[#30363D] font-bold text-base"
        >
          +
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.8))}
          className="w-9 h-9 flex items-center justify-center text-[#F0F6FC] hover:bg-[#21262D] transition-colors font-bold text-base"
        >
          −
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="w-9 h-9 flex items-center justify-center text-[10px] font-mono text-[#8B949E] hover:bg-[#21262D] transition-colors border-t border-[#30363D]"
        >
          1:1
        </button>
      </div>

      {/* Leyenda interactiva inferior derecha */}
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 bg-[#161B22]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#30363D] text-xs font-mono">
          {Object.entries(CONTINENTAL_MAPS).map(([name, info]) => (
            <div 
              key={name}
              onClick={(e) => handleRegionClick(name, e)}
              className={`flex items-center gap-1.5 cursor-pointer transition-opacity ${
                selectedRegion === name ? "opacity-100 font-bold" : "opacity-60 hover:opacity-100"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: info.color }} />
              <span className="text-[#F0F6FC]">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lienzo SVG con eventos de clic totalmente operativos */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg viewBox="0 0 850 500" className="w-full h-full max-w-[900px] max-h-[520px]">
          <defs>
            <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-green" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-yellow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {Object.entries(CONTINENTAL_MAPS).map(([name, data]) => {
            const isSelected = selectedRegion === "Todas" || selectedRegion === name;
            const isHovered = hoveredRegion === name;
            const isCurrentActive = selectedRegion === name;

            return (
              <g 
                key={name}
                onClick={(e) => handleRegionClick(name, e)}
                onMouseEnter={() => setHoveredRegion(name)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Superficie de la isla clickeable */}
                <path
                  d={data.path}
                  fill={data.color}
                  fillOpacity={isCurrentActive ? 0.55 : (isSelected ? (isHovered ? 0.4 : 0.25) : 0.1)}
                  stroke={data.color}
                  strokeWidth={isCurrentActive ? 3.5 : (isSelected ? 2 : 1.2)}
                  filter={isCurrentActive || isHovered ? `url(#glow-${name === 'Rajira' ? 'red' : name === 'Arpenia' ? 'green' : 'yellow'})` : 'none'}
                  className="transition-all duration-300"
                />

                {/* Capital y etiquetas */}
                <g className="pointer-events-none">
                  {isCurrentActive && (
                    <circle 
                      cx={data.capitalPos.x} 
                      cy={data.capitalPos.y} 
                      r="12" 
                      fill="none" 
                      stroke={data.color} 
                      strokeWidth="1.5" 
                      className="animate-ping opacity-75"
                    />
                  )}
                  <circle 
                    cx={data.capitalPos.x} 
                    cy={data.capitalPos.y} 
                    r="4.5" 
                    fill="#FFFFFF" 
                    stroke={data.color} 
                    strokeWidth="2.5" 
                  />
                  <text
                    x={data.capitalPos.x}
                    y={data.capitalPos.y + 22}
                    fill="#F0F6FC"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="Fraunces, Georgia, serif"
                    textAnchor="middle"
                    className="select-none drop-shadow-md"
                  >
                    {name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}