'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface GenderComparisonChartProps {
  data: {
    year: number;
    male: number;
    female: number;
    total?: number;
  };
  title: string;
  unit: string;
  valueFormatter?: (value: number) => string;
}

export default function GenderComparisonChart({
  data,
  title,
  unit,
  valueFormatter = (v) => v.toFixed(2),
}: GenderComparisonChartProps) {
  const chartData = [
    { category: 'Male', value: data.male, color: '#3B82F6' },
    { category: 'Female', value: data.female, color: '#EC4899' },
  ];

  if (data.total) {
    chartData.push({ category: 'Total', value: data.total, color: '#8B5CF6' });
  }

  const gap = data.male - data.female;
  const gapPercentage = ((Math.abs(gap) / ((data.male + data.female) / 2)) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-primary">{title}</h3>
        <div className="text-sm text-slate-light">
          Year: {data.year}
        </div>
      </div>

      {/* Gender Gap Indicator */}
      <div className={`p-3 rounded-lg border ${gap > 0
        ? 'bg-blue-50 border-blue-200'
        : 'bg-pink-50 border-pink-200'
        }`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate">Gender Gap:</span>
          <span className={`text-sm font-bold ${gap > 0 ? 'text-blue-600' : 'text-pink-600'
            }`}>
            {gapPercentage}% {gap > 0 ? '(favors male)' : '(favors female)'}
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="category"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
          />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            label={{ value: unit, angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [valueFormatter(value), unit]}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>

      {/* Values Table */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate/10">
        <div className="text-center">
          <div className="text-xs text-slate-light mb-1">Male</div>
          <div className="text-lg font-semibold text-blue-600">{valueFormatter(data.male)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-light mb-1">Female</div>
          <div className="text-lg font-semibold text-pink-600">{valueFormatter(data.female)}</div>
        </div>
        {data.total && (
          <div className="text-center">
            <div className="text-xs text-slate-light mb-1">Total</div>
            <div className="text-lg font-semibold text-purple-600">{valueFormatter(data.total)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
