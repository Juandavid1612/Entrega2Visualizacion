import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { regionColor } from "../utils/regions";

export default function BarChartComponent({ data, dataKey, title }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full bg-[#161B22] border border-[#30363D] p-6 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="Continente" stroke="#8B949E" />
            <YAxis stroke="#8B949E" />
            <Tooltip
              contentStyle={{ backgroundColor: "#161B22", borderColor: "#30363D", color: "#fff" }}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={regionColor(entry.Continente)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}