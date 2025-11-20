import { TrendPoint } from '@/types';

interface TrendSparklineProps {
    data: TrendPoint[];
    width?: number;
    height?: number;
    color?: string;
    higherIsBetter?: boolean;
}

export default function TrendSparkline({
    data,
    width = 100,
    height = 30,
    color = '#00A7C4',
    higherIsBetter = true,
}: TrendSparklineProps) {
    if (!data || data.length < 2) {
        return null;
    }

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    // Create SVG path
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((point.value - min) / range) * height;
        return `${x},${y}`;
    });

    const pathD = `M ${points.join(' L ')}`;

    // Determine if trend is positive
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const isPositive = higherIsBetter
        ? lastValue >= firstValue
        : lastValue <= firstValue;

    const strokeColor = isPositive ? '#10B981' : '#EF4444';

    return (
        <svg
            width={width}
            height={height}
            className="inline-block"
            viewBox={`0 0 ${width} ${height}`}
        >
            <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
