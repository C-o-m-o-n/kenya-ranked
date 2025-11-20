import { TrendPoint } from '@/types';

interface LineChartProps {
    data: TrendPoint[];
    dataKey?: string;
    xAxisKey?: string;
    color?: string;
    title?: string;
    yAxisLabel?: string;
}

export default function LineChart({
    data,
    color = '#00A7C4',
    title,
    yAxisLabel,
}: LineChartProps) {
    if (!data || data.length < 2) {
        return null;
    }

    const values = data.map((d) => d.value);
    const years = data.map((d) => d.year);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const width = 800;
    const height = 300;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Create path for line
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - ((point.value - min) / range) * chartHeight;
        return { x, y, value: point.value, year: point.year };
    });

    const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;

    // Y-axis ticks
    const yTicks = 5;
    const yTickValues = Array.from({ length: yTicks }, (_, i) => {
        return min + (range / (yTicks - 1)) * i;
    });

    return (
        <div className="w-full">
            {title && (
                <h4 className="text-lg font-heading font-semibold text-primary mb-4">
                    {title}
                </h4>
            )}
            <div className="bg-white rounded-lg p-4">
                <svg
                    width="100%"
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className="overflow-visible"
                >
                    {/* Y-axis label */}
                    {yAxisLabel && (
                        <text
                            x={10}
                            y={height / 2}
                            transform={`rotate(-90 10 ${height / 2})`}
                            className="text-xs fill-slate-light"
                            textAnchor="middle"
                        >
                            {yAxisLabel}
                        </text>
                    )}

                    {/* Chart area */}
                    <g transform={`translate(${padding.left}, ${padding.top})`}>
                        {/* Grid lines */}
                        {yTickValues.map((tick, i) => {
                            const y = chartHeight - ((tick - min) / range) * chartHeight;
                            return (
                                <g key={i}>
                                    <line
                                        x1={0}
                                        y1={y}
                                        x2={chartWidth}
                                        y2={y}
                                        stroke="#E2E8F0"
                                        strokeDasharray="3 3"
                                    />
                                    <text
                                        x={-10}
                                        y={y}
                                        className="text-xs fill-slate-light"
                                        textAnchor="end"
                                        dominantBaseline="middle"
                                    >
                                        {tick.toFixed(2)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* X-axis labels */}
                        {points.map((point, i) => (
                            <text
                                key={i}
                                x={point.x}
                                y={chartHeight + 20}
                                className="text-xs fill-slate-light"
                                textAnchor="middle"
                            >
                                {point.year}
                            </text>
                        ))}

                        {/* Line */}
                        <path
                            d={pathD}
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {points.map((point, i) => (
                            <g key={i}>
                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="5"
                                    fill={color}
                                    className="cursor-pointer hover:r-6 transition-all"
                                />
                                <title>
                                    {point.year}: {point.value}
                                </title>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
}
