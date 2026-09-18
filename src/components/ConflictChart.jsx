import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = {
  Entretenimiento: '#5BCDFB',
  Territorio: '#0A7395',
  Venganza: '#1A9CC7',
  Racismo: '#06405F',
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      <tspan x={x} dy="-0.3em">
        {name}
      </tspan>

      <tspan x={x} dy="1.2em">
        {value}%
      </tspan>
    </text>
  );
};

export default function ConflictChart({
  data,
  title = 'Razones conflicto Arpenia',
}) {
  if (!data || data.length === 0) return null;

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2
        style={{
          margin: '0 0 20px 0',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        {title}
      </h2>

      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="Porcentaje"
              nameKey="Razón"
              cx="50%"
              cy="50%"
              outerRadius={140}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry['Razón']] || '#CCCCCC'}
                />
              ))}
            </Pie>

            <Legend
              align="left"
              verticalAlign="top"
              iconType="square"
              iconSize={15}
              wrapperStyle={{
                color: '#333',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#888',
        }}
      >
        Created with Datawrapper
      </div>
    </div>
  );
}