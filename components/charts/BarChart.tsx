import { ComparisonData } from '@/types';

interface BarChartProps {
    data: ComparisonData[];
    dataKey?: string;
    nameKey?: string;
    title?: string;
    yAxisLabel?: string;
    highlightCountry?: string;
}

export default function BarChart({
    data,
    title,
    yAxisLabel,
    highlightCountry = 'Kenya',
}: BarChartProps) {
    if (!data || data.length === 0) {
        return null;
    }

    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values, 0);
    const range = max - min || 1;

    const width = 800;
    const height = 350;
    const padding = { top: 40, right: 40, bottom: 100, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const barWidth = chartWidth / data.length - 10;

    const getBarColor = (country: string) => {
        if (country === highlightCountry) return '#0F9D58';
        if (country.includes('Avg') || country.includes('Average')) return '#F59E0B';
        return '#00A7C4';
    };

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
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                            const y = chartHeight * (1 - ratio);
                            const value = min + range * ratio;
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
                                        {value.toFixed(1)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Bars */}
                        {data.map((item, i) => {
                            const x = (i * chartWidth) / data.length + 5;
                            const barHeight = ((item.value - min) / range) * chartHeight;
                            const y = chartHeight - barHeight;
                            const color = getBarColor(item.country);

                            return (
                                <g key={i}>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        fill={color}
                                        rx="8"
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    >
                                        <title>
                                            {item.country}: {item.value}
                                        </title>
                                    </rect>

                                    {/* Country label */}
                                    <text
                                        x={x + barWidth / 2}
                                        y={chartHeight + 15}
                                        className="text-xs fill-slate"
                                        textAnchor="end"
                                        transform={`rotate(-45 ${x + barWidth / 2} ${chartHeight + 15})`}
                                    >
                                        {item.country}
                                    </text>

                                    {/* Value label on top of bar */}
                                    <text
                                        x={x + barWidth / 2}
                                        y={y - 5}
                                        className="text-xs fill-slate font-semibold"
                                        textAnchor="middle"
                                    >
                                        {item.value}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}
