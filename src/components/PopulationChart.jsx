import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PopulationTimeline({ data }) {
  // Comprobación para saber si realmente están llegando datos
  if (!data || data.length === 0) {
    return (
      <div className="w-full rounded-lg border border-red-500 bg-[#161B22] p-6 text-red-400">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-[#30363D] bg-[#161B22] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Muertes por continente cada año
      </h2>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >

            <CartesianGrid
              stroke="#30363D"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="Año"
              stroke="#8B949E"
              tick={{
                fill: "#8B949E",
                fontSize: 12,
              }}
            />

            <YAxis
              stroke="#8B949E"
              tick={{
                fill: "#8B949E",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "8px",
                color: "#F0F6FC",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="Rajira"
              stroke="#FF3366"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="Arpenia"
              stroke="#00E676"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="Mareina"
              stroke="#00D4FF"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}