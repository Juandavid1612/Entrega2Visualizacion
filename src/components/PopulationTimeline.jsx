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

function formatNumber(value) {
  return new Intl.NumberFormat("es-CO").format(value);
}

function formatCompact(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`;
  }

  return value;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-md shadow-lg">
      <p className="font-bold text-base text-white border-b border-[#30363D] pb-2 mb-3">
        Año {label}
      </p>

      <div className="flex flex-col gap-2">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: entry.color,
                  boxShadow: `0 0 8px ${entry.color}`,
                }}
              />

              <span
                className="font-medium"
                style={{ color: entry.color }}
              >
                {entry.dataKey}
              </span>
            </div>

            <span className="text-white font-bold">
              {formatNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PopulationTimeline({ data, title }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[var(--color-paper-deep)] border border-[var(--color-line)] p-4 sm:p-6 rounded-lg shadow-lg">
      
      {/* Título dinámico que recibe el componente */}
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-white">
          {title}
        </h2>
      )}

      <div className="w-full h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              bottom: 10,
              left: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#30363D"
              opacity={0.5}
            />

            <XAxis
              dataKey="Año"
              tick={{
                fill: "#8B949E",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              tickFormatter={formatCompact}
              tick={{
                fill: "#8B949E",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={50}
              iconType="circle"
              wrapperStyle={{
                fontSize: "13px",
                color: "#F0F6FC",
              }}
            />

            <Line
              type="monotone"
              dataKey="Rajira"
              stroke="#FF3366"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#FF3366",
                stroke: "#161B22",
                strokeWidth: 2,
              }}
              animationDuration={1500}
            />

            <Line
              type="monotone"
              dataKey="Arpenia"
              stroke="#00E676"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#00E676",
                stroke: "#161B22",
                strokeWidth: 2,
              }}
              animationDuration={1500}
            />

            <Line
              type="monotone"
              dataKey="Mareina"
              stroke="#00D4FF"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#00D4FF",
                stroke: "#161B22",
                strokeWidth: 2,
              }}
              animationDuration={1500}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}