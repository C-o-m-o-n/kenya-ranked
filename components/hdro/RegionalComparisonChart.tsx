'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RegionalComparisonChartProps {
  data: Array<{ country: string; value: number }>;
  title: string;
  yAxisLabel: string;
  valueFormatter?: (value: number) => string;
  higherIsBetter?: boolean;
}

export default function RegionalComparisonChart({
  data,
  title,
  yAxisLabel,
  valueFormatter = (v) => v.toFixed(3),
  higherIsBetter = true,
}: RegionalComparisonChartProps) {
  // Sort data by value (descending)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Find Kenya's position
  const kenyaIndex = sortedData.findIndex(d => d.country === 'Kenya');
  const kenyaValue = sortedData[kenyaIndex]?.value || 0;

  // Color function
  const getBarColor = (country: string, value: number) => {
    if (country === 'Kenya') return '#0F766E'; // Primary color for Kenya
    if (country.includes('Avg')) return '#94A3B8'; // Gray for averages
    
    // Color based on performance relative to Kenya
    if (higherIsBetter) {
      return value > kenyaValue ? '#10B981' : '#EF4444';
    } else {
      return value < kenyaValue ? '#10B981' : '#EF4444';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-primary">{title}</h3>
        <div className="text-sm text-slate-light">
          Kenya ranks #{kenyaIndex + 1} of {sortedData.filter(d => !d.country.includes('Avg')).length}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            type="number"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            label={{
              value: yAxisLabel,
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#64748B', fontSize: 12 },
            }}
          />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [valueFormatter(value), yAxisLabel]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.country, entry.value)}
                opacity={entry.country === 'Kenya' ? 1 : 0.8}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0F766E' }}></div>
          <span className="text-slate">Kenya</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981', opacity: 0.8 }}></div>
          <span className="text-slate">{higherIsBetter ? 'Above Kenya' : 'Below Kenya'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444', opacity: 0.8 }}></div>
          <span className="text-slate">{higherIsBetter ? 'Below Kenya' : 'Above Kenya'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#94A3B8', opacity: 0.8 }}></div>
          <span className="text-slate">Regional Averages</span>
        </div>
      </div>
    </div>
  );
}
