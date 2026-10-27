import { useEffect, useState } from "react";
import { loadCsv } from "../utils/loadCsv";
import { REGIONS, regionColor } from "../utils/regions";
import { formatNumber } from "../utils/format";
import WorldMap from "../components/WorldMap";
import BarChartComponent from "../components/BarChartComponent";
import PopulationTimeline from "../components/PopulationTimeline";
import ConflictChart from "../components/ConflictChart";
import HistoryCompendium from "../components/HistoryCompendium";
import FloraViewer from "../components/FloraViewer"; // <-- NUEVO COMPONENTE DE LA FLOR

// Importación de íconos vectoriales profesionales (Lucide React)
import { 
  Home as HomeIcon, 
  Map, 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  BookOpen, 
  Globe, 
  Compass, 
  Users, 
  Building2, 
  Maximize2,
  ChevronRight,
  Flower2 // <-- NUEVO ICONO PARA LA FLOR
} from "lucide-react";

// SÍMBOLOS VECTORIALES PERSONALIZADOS POR REGIÓN
export function RajiraSymbol({ className = "w-5 h-5", color = "#FF3366" }) {
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
      <path d="M12 6L15 11L12 18L9 11L12 6Z" fill={color} />
    </svg>
  );
}

export function ArpeniaSymbol({ className = "w-5 h-5", color = "#00E676" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C12 2 19 8 19 14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14C5 8 12 2 12 2Z" 
        fill={color} 
        fillOpacity="0.2" 
        stroke={color} 
        strokeWidth="1.8"
      />
      <path d="M12 6V18M12 12L16 9M12 15L16 12M12 12L8 9M12 15L8 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MareinaSymbol({ className = "w-5 h-5", color = "#FFB300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill={color} />
    </svg>
  );
}

export function RegionSymbol({ region, className = "w-5 h-5" }) {
  if (region === "Rajira") return <RajiraSymbol className={className} color="#FF3366" />;
  if (region === "Arpenia") return <ArpeniaSymbol className={className} color="#00E676" />;
  if (region === "Mareina") return <MareinaSymbol className={className} color="#FFB300" />;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 22,22 2,22" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

export default function Home() {
  const [dataSets, setDataSets] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState("mapa"); 
  const [selectedRegion, setSelectedRegion] = useState("Rajira"); 
  const [activeSidebarNav, setActiveSidebarNav] = useState("resumen"); // 'resumen', 'mapa', 'comparativas', 'tendencias', 'conflictos', 'historia', 'flora'

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    Promise.all([
      loadCsv(`${base}data/comparativo_poblacion_por_continente.csv`),
      loadCsv(`${base}data/comparativo_flores_por_continente.csv`),
      loadCsv(`${base}data/tendencia_poblacion_por_continente.csv`),
      loadCsv(`${base}data/tendencia_muertes_por_continente.csv`),
      loadCsv(`${base}data/parte_razones_conflicto_arpenia.csv`),
      loadCsv(`${base}data/parte_razones_conflicto_rajira.csv`),
    ]).then(([comp, flores, tendPob, tendMuertes, confArp, confRaj]) => {
      setDataSets({ comp, flores, tendPob, tendMuertes, confArp, confRaj });
      setLoading(false);
    });
  }, []);

  const currentRegionInfo = REGIONS[selectedRegion] || REGIONS.Rajira;
  const currentPop = dataSets.comp?.find(r => r.Continente === selectedRegion)?.Habitantes || 4100000;
  const totalGlobalPop = dataSets.comp?.reduce((acc, curr) => acc + (curr.Habitantes || 0), 0) || 21200000;

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-[#F0F6FC] font-sans">
      
      {/* 1. BARRA LATERAL IZQUIERDA */}
      <aside className="w-64 bg-[#090D12] border-r border-[#21262D] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5 select-none">
        <div>
          {/* Logo del Atlas */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-center shadow-lg text-white">
              <Compass className="w-6 h-6 text-[#FF3366]" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wider text-[#F0F6FC]">ATLAS</h1>
              <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-widest">REGISTRO CONTINENTAL</p>
            </div>
          </div>

          <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mb-3 px-2">
            NAVEGACIÓN PRINCIPAL
          </p>

          <nav className="flex flex-col gap-1.5 mb-8">
            {[
              { id: "resumen", label: "Resumen", icon: HomeIcon },
              { id: "mapa", label: "Mapa territorial", icon: Map },
              { id: "comparativas", label: "Comparativas", icon: BarChart3 },
              { id: "tendencias", label: "Tendencias", icon: TrendingUp },
              { id: "conflictos", label: "Conflictos", icon: ShieldAlert },
              { id: "historia", label: "Historia y Lore", icon: BookOpen },
              { id: "flora", label: "Flor de Rajira", icon: Flower2 }, // <-- NUEVA PESTAÑA EN SIDEBAR
            ].map(item => {
              const IconComponent = item.icon;
              const isActive = activeSidebarNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarNav(item.id);
                    if (item.id === "mapa") setActiveTab("mapa");
                    if (item.id === "comparativas") setActiveTab("barras");
                    if (item.id === "tendencias") setActiveTab("lineas");
                    if (item.id === "conflictos") setActiveTab("conflictos");
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-[#161B22] text-white border border-[#30363D] shadow-sm font-semibold" 
                      : "text-[#8B949E] hover:bg-[#161B22]/50 hover:text-white"
                  }`}
                  style={{
                    borderLeft: isActive ? "4px solid #FF3366" : "4px solid transparent"
                  }}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-[#FF3366]" : "text-[#8B949E]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mb-3 px-2">
            REGIONES DEL MUNDO
          </p>

          <nav className="flex flex-col gap-1.5">
            {[
              { id: "Todas", label: "Vista Panorama (Todas)" },
              { id: "Rajira", label: "Rajira" },
              { id: "Arpenia", label: "Arpenia" },
              { id: "Mareina", label: "Mareina" },
            ].map(item => {
              const isSelected = selectedRegion === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedRegion(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                    isSelected 
                      ? "bg-[#161B22] text-white font-medium border border-[#30363D]" 
                      : "text-[#8B949E] hover:bg-[#161B22]/40 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RegionSymbol region={item.id} className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {isSelected && <span className="text-[10px] font-mono text-[#FF3366] uppercase">Activa</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="pt-4 border-t border-[#21262D] text-xs font-mono text-[#8B949E] flex justify-between items-center px-2">
          <span>v2.4 — GitHub Pages</span>
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="font-mono text-sm text-[#8B949E] animate-pulse">Cargando registros del Atlas Continental...</p>
          </div>
        ) : activeSidebarNav === "historia" ? (
          <HistoryCompendium />
        ) : activeSidebarNav === "flora" ? (
          <FloraViewer /> // <-- RENDERIZA EL VISOR DE LA FLOR DE RAJIRA
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col gap-6">

            {/* Cabecera Principal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21262D] pb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B949E] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#FF3366]" /> REGIÓN SELECCIONADA
                </span>
                
                <div className="flex items-center gap-3.5 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-center shadow-lg shrink-0">
                    <RegionSymbol region={selectedRegion} className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-[#F0F6FC]">
                    {selectedRegion === "Todas" ? "Panorama Continental" : selectedRegion}
                  </h2>
                </div>

                <p className="text-sm text-[#8B949E] mt-2 max-w-xl">
                  {selectedRegion === "Todas" 
                    ? "Visión global e integrada de las tres grandes naciones del mundo." 
                    : currentRegionInfo.lore}
                </p>
              </div>

              {/* Selector desplegable superior */}
              <div className="flex items-center">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-[#161B22] border border-[#30363D] text-sm font-medium rounded-lg px-4 py-2.5 text-[#F0F6FC] focus:outline-none focus:border-[#8B949E]"
                >
                  <option value="Todas">Todas las regiones</option>
                  <option value="Rajira">Rajira</option>
                  <option value="Arpenia">Arpenia</option>
                  <option value="Mareina">Mareina</option>
                </select>
              </div>
            </div>

            {/* Pestañas de Navegación Superior */}
            <div className="flex border-b border-[#21262D] gap-8">
              {[
                { id: "mapa", label: "Mapa territorial" },
                { id: "barras", label: "Comparativas" },
                { id: "lineas", label: "Tendencias" },
                { id: "conflictos", label: "Conflictos" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "mapa") setActiveSidebarNav("mapa");
                    if (tab.id === "barras") setActiveSidebarNav("comparativas");
                    if (tab.id === "lineas") setActiveSidebarNav("tendencias");
                    if (tab.id === "conflictos") setActiveSidebarNav("conflictos");
                  }}
                  className={`pb-3 font-medium text-sm transition-all relative ${
                    activeTab === tab.id ? "text-white font-semibold" : "text-[#8B949E] hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF3366] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* BANNERS SUPERIORES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {["Rajira", "Arpenia", "Mareina"].map((regName) => {
                const reg = REGIONS[regName];
                const pop = dataSets.comp?.find(r => r.Continente === regName)?.Habitantes || 4000000;
                const isSelected = selectedRegion === regName;

                return (
                  <div
                    key={regName}
                    onClick={() => setSelectedRegion(regName)}
                    className={`cursor-pointer bg-[#161B22] border rounded-xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                      isSelected ? "border-[#FF3366] shadow-2xl bg-[#1c212c]" : "border-[#30363D] hover:border-[#8B949E]"
                    }`}
                    style={{ borderLeft: `4px solid ${reg.color}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0D1117] border border-[#30363D] flex items-center justify-center shadow-inner">
                          <RegionSymbol region={regName} className="w-5 h-5" />
                        </div>
                        <span className="font-serif font-bold text-lg text-white">{regName}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8B949E]" />
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider block">CAPITAL</span>
                        <span className="text-sm font-medium text-white">{reg.capital}</span>
                        <div className="font-mono text-2xl font-bold text-white mt-1">
                          {formatNumber(pop)}
                        </div>
                        <span className="text-[11px] font-mono text-[#8B949E]">habitantes registrados</span>
                      </div>

                      <div className="flex items-end gap-1 h-10 opacity-80">
                        {[35, 55, 45, 75, 65, 90].map((val, i) => (
                          <span
                            key={i}
                            className="w-1.5 rounded-t transition-all"
                            style={{ height: `${val}%`, backgroundColor: reg.color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* GRID PRINCIPAL: MAPA + FICHA TÉCNICA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-[#161B22]/60 border border-[#30363D] rounded-xl p-6 shadow-xl backdrop-blur-md">
                {activeTab === "mapa" && (
                  <WorldMap 
                    selectedRegion={selectedRegion} 
                    setSelectedRegion={setSelectedRegion} 
                  />
                )}
                {activeTab === "barras" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BarChartComponent data={dataSets.comp} dataKey="Habitantes" title="Población por Continente" />
                    <BarChartComponent data={dataSets.flores} dataKey="Cantidad de flores" title="Producción de Flores" />
                  </div>
                )}
                {activeTab === "lineas" && (
                  <div className="flex flex-col gap-6">
                    <PopulationTimeline data={dataSets.tendPob} title="Tendencia de Población" />
                    <PopulationTimeline data={dataSets.tendMuertes} title="Tendencia de Muertes" />
                  </div>
                )}
                {activeTab === "conflictos" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ConflictChart data={dataSets.confArp} title="Conflictos Arpenia" />
                    <ConflictChart data={dataSets.confRaj} title="Conflictos Rajira" />
                  </div>
                )}
              </div>

              {/* Ficha Lateral */}
              <div className="flex flex-col gap-6">
                
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg text-white">
                      {selectedRegion === "Todas" ? "Ficha Continental" : `Ficha de ${selectedRegion}`}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-[#FF3366] text-[#FF3366] bg-[#FF3366]/10">
                      REGIÓN SELECCIONADA
                    </span>
                  </div>

                  <p className="text-xs text-[#8B949E] mb-6 leading-relaxed">
                    {selectedRegion === "Todas" 
                      ? "Datos consolidados de la superficie y población total de las tres grandes naciones registradas en este mundo."
                      : currentRegionInfo.lore}
                  </p>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="flex items-center justify-between py-2.5 border-b border-[#21262D]">
                      <span className="text-[#8B949E] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#8B949E]" /> Población:
                      </span>
                      <span className="font-bold text-white">
                        {selectedRegion === "Todas" ? formatNumber(totalGlobalPop) : formatNumber(currentPop)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2.5 border-b border-[#21262D]">
                      <span className="text-[#8B949E] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#8B949E]" /> Capital:
                      </span>
                      <span className="font-medium text-white">
                        {selectedRegion === "Todas" ? "Varias" : currentRegionInfo.capital}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2.5 border-b border-[#21262D]">
                      <span className="text-[#8B949E] flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-[#8B949E]" /> Superficie:
                      </span>
                      <span className="text-white">
                        {selectedRegion === "Todas" ? "6.385.000 km²" : `${currentRegionInfo.area} km²`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Distribución Territorial */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 shadow-xl">
                  <h4 className="font-serif font-bold text-base text-white mb-1">
                    Distribución territorial
                  </h4>
                  <p className="text-xs text-[#8B949E] mb-4">
                    Densidad según la naturaleza de la región
                  </p>

                  {(() => {
                    const dist = selectedRegion === "Todas" 
                      ? { urban: 35, rural: 45, natural: 20 } 
                      : (currentRegionInfo.distribution || { urban: 35, rural: 45, natural: 20 });

                    return (
                      <div className="space-y-4">
                        <div className="w-full h-3 rounded-full bg-[#21262D] overflow-hidden flex">
                          <div style={{ width: `${dist.urban}%` }} className="bg-[#00E676] h-full" title="Zonas urbanas" />
                          <div style={{ width: `${dist.rural}%` }} className="bg-[#FFB300] h-full" title="Zonas rurales" />
                          <div style={{ width: `${dist.natural}%` }} className="bg-[#FF3366] h-full" title="Zonas naturales" />
                        </div>

                        <div className="space-y-2 pt-2 text-xs font-mono">
                          <div className="flex justify-between items-center">
                            <span className="text-[#8B949E] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#00E676]" /> Zonas urbanas
                            </span>
                            <span className="font-bold text-white">{dist.urban}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8B949E] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FFB300]" /> Zonas rurales
                            </span>
                            <span className="font-bold text-white">{dist.rural}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8B949E] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FF3366]" /> Zonas naturales
                            </span>
                            <span className="font-bold text-white">{dist.natural}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}