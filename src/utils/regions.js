export const REGIONS = {
  Rajira: {
    color: "#FF3366",
    bgGlow: "rgba(255, 51, 102, 0.15)",
    label: "Rajira",
    capital: "Rajira Central",
    area: "1.250.000",
    lore: "Una región de vastos territorios y comunidades salvajes en el corazón del continente. Terrenos hostiles y escasez de recursos.",
    distribution: { urban: 5, rural: 80, natural: 15 }
  },
  Arpenia: {
    color: "#00E676",
    bgGlow: "rgba(0, 230, 118, 0.15)",
    label: "Arpenia",
    capital: "Arpenia Prime",
    area: "2.910.000",
    lore: "Megalópolis tecnificada y centro de poder continental. Concentra la mayor densidad de población e industria.",
    distribution: { urban: 75, rural: 10, natural: 15 }
  },
  Mareina: {
    color: "#FFB300",
    bgGlow: "rgba(255, 179, 0, 0.15)",
    label: "Mareina",
    capital: "Puerto Mareina",
    area: "2.225.000",
    lore: "Territorio templado y marítimo con un delicado equilibrio entre florecientes rutas comerciales rurales y puertos.",
    distribution: { urban: 30, rural: 40, natural: 30 }
  },
};

export function regionColor(name) {
  return REGIONS[name]?.color ?? "#8B949E";
}