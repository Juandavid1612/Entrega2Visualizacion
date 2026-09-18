import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import PopulationTimeline from "../components/PopulationTimeline";
import ConflictChart from "../components/ConflictChart";
import WorldMap from "../components/WorldMap";
import BarChartComponent from "../components/BarChartComponent";
import { loadCsv } from "../utils/loadCsv";
import { regionColor } from "../utils/regions";

export default function Home() {
  const [dataSets, setDataSets] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Estados para los filtros del Dashboard
  const [activeTab, setActiveTab] = useState("mapa"); // mapa, lineas, barras, conflictos
  const [selectedRegion, setSelectedRegion] = useState("Todas"); // Todas, Rajira, Arpenia, Mareina

  useEffect(() => {
    Promise.all([
      loadCsv(`${import.meta.env.BASE_URL}data/comparativo_poblacion_por_continente.csv`),
      loadCsv(`${import.meta.env.BASE_URL}data/comparativo_flores_por_continente.csv`),
      loadCsv(`${import.meta.env.BASE_URL}data/tendencia_poblacion_por_continente.csv`),
      loadCsv(`${import.meta.env.BASE_URL}data/tendencia_muertes_por_continente.csv`),
      loadCsv(`${import.meta.env.BASE_URL}data/parte_razones_conflicto_arpenia.csv`),
      loadCsv(`${import.meta.env.BASE_URL}data/parte_razones_conflicto_rajira.csv`),
    ]).then(([comp, flores, tendPob, tendMuertes, confArp, confRaj]) => {
        setDataSets({ comp, flores, tendPob, tendMuertes, confArp, confRaj });
        setLoading(false);
      });
  }, []);

  // Función para filtrar datos de tarjetas según región seleccionada
  const filteredCards = dataSets.comp?.filter(row => 
    selectedRegion === "Todas" || row.Continente === selectedRegion
  ) || [];

  return (
    <main className="bg-[#121016] text-[#f3f4f6] min-h-screen relative font-sans">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Header />

        {/* Panel de Filtros */}
        <div className="py-6 flex flex-col md:flex-row gap-4 border-b border-[#2d2438] mb-8">
          <div className="flex gap-2">
            {["Todas", "Rajira", "Arpenia", "Mareina"].map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                  selectedRegion === region ? "bg-[#cc3366] text-white" : "bg-[#1b1724] text-[#9ca3af] hover:bg-[#2d2438]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 md:ml-auto">
            {[
              { id: "mapa", label: "Mapa Espacial" },
              { id: "barras", label: "Comparativas" },
              { id: "lineas", label: "Tendencias Temporales" },
              { id: "conflictos", label: "Causas de Conflicto" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${
                  activeTab === tab.id ? "bg-white text-black" : "border border-[#30363D] text-[#9ca3af] hover:border-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="animate-pulse">Cargando la base de datos de la Alianza...</p>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Tarjetas de Resumen (siempre visibles, pero filtrables) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {filteredCards.map((row, i) => (
                <StatCard
                  key={row.Continente}
                  region={row.Continente}
                  color={regionColor(row.Continente)}
                  capital={row.Capital}
                  area={row.Superficie_km2}
                  population={row.Habitantes}
                  delay={i * 150}
                />
              ))}
            </div>

            {/* Área dinámica según la pestaña seleccionada */}
            <div className="p-6 rounded-xl bg-[#1b1724]/50 border border-[#2d2438] shadow-2xl backdrop-blur-md">
              
              {activeTab === "mapa" && (
                <WorldMap selectedRegion={selectedRegion} />
              )}

              {activeTab === "barras" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <BarChartComponent 
                    data={dataSets.comp} 
                    dataKey="Habitantes" 
                    title="Población por Continente" 
                  />
                  <BarChartComponent 
                    data={dataSets.flores} 
                    dataKey="Cantidad de flores" 
                    title="Producción de Flores por Continente" 
                  />
                </div>
              )}

              {activeTab === "lineas" && (
                <div className="grid grid-cols-1 gap-8">
                  <PopulationTimeline data={dataSets.tendPob} title="Población por continente cada año" />
                  <PopulationTimeline data={dataSets.tendMuertes} title="Muertes por continente cada año" />
                </div>
              )}

              {activeTab === "conflictos" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ConflictChart data={dataSets.confArp} title="Razones conflicto Arpenia" />
                  <ConflictChart data={dataSets.confRaj} title="Razones conflicto Rajira" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}