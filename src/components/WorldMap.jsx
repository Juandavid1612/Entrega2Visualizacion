import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { regionColor } from "../utils/regions";

const geoUrl = `${import.meta.env.BASE_URL}data/fictional_world_continents.json`;

export default function WorldMap({ selectedRegion }) {
  return (
    <div className="w-full bg-[#161B22] border border-[#30363D] p-6 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Mapa Territorial y Estadístico
      </h2>
      <div className="h-[400px] w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 120 }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const regionName = geo.properties.name;
                const isSelected = selectedRegion === "Todas" || selectedRegion === regionName;
                const fill = isSelected ? regionColor(regionName) : "#30363D";
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#0D1117"
                    strokeWidth={1.5}
                    style={{
                      default: { outline: "none", transition: "all 250ms" },
                      hover: { fill: "#F0F6FC", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}