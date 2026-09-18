// Identidad visual por region: cada continente tiene un color fijo
// que se repite en folios, graficos y leyendas (como en una leyenda de mapa).
export const REGIONS = {
  Rajira: { color: "#7C2F27", label: "Rajira" },
  Arpenia: { color: "#2E4A3B", label: "Arpenia" },
  Mareina: { color: "#8C6A28", label: "Mareina" },
};

export function regionColor(name) {
  return REGIONS[name]?.color ?? "#6E6045";
}