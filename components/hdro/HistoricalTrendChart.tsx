'use client';

import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HistoricalTrendChartProps {
  data: Array<{ year: number; value: number }>;
  title: string;
  yAxisLabel: string;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
}

export default function HistoricalTrendChart({
  data,
  title,
  yAxisLabel,
  valueFormatter = (v) => v.toFixed(3),
  showLegend = false,
}: HistoricalTrendChartProps) {
  // Sort data by year
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // Calculate trend
  const firstValue = sortedData[0]?.value || 0;
  const lastValue = sortedData[sortedData.length - 1]?.value || 0;
  const change = lastValue - firstValue;
  const percentChange = firstValue !== 0 ? ((change / firstValue) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-primary">{title}</h3>
        <div className="text-right">
          <div className="text-sm text-slate-light">
            {sortedData[0]?.year} - {sortedData[sortedData.length - 1]?.year}
          </div>
          <div className={`text-sm font-semibold ${change >= 0 ? 'text-data-green' : 'text-data-red'
            }`}>
            {change >= 0 ? '+' : ''}{percentChange}% change
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickFormatter={(value) => value.toString()}
          />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#64748B', fontSize: 12 },
            }}
            domain={['dataMin - 0.01', 'dataMax + 0.01']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [valueFormatter(value), yAxisLabel]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          {showLegend && <Legend />}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0F766E"
            strokeWidth={3}
            dot={{ fill: '#0F766E', r: 4 }}
            activeDot={{ r: 6 }}
            name={yAxisLabel}
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate/10">
        <div className="text-center">
          <div className="text-xs text-slate-light mb-1">First ({sortedData[0]?.year})</div>
          <div className="text-lg font-semibold text-primary">{valueFormatter(firstValue)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-light mb-1">Latest ({sortedData[sortedData.length - 1]?.year})</div>
          <div className="text-lg font-semibold text-primary">{valueFormatter(lastValue)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-light mb-1">Change</div>
          <div className={`text-lg font-semibold ${change >= 0 ? 'text-data-green' : 'text-data-red'
            }`}>
            {change >= 0 ? '+' : ''}{valueFormatter(change)}
          </div>
        </div>
      </div>
    </div>
  );
}
