// Formatting and utility functions for HDRO data

import type { HDRODataPoint, GenderDataPoint } from './types';

/**
 * Indicator types for formatting
 */
export type IndicatorType = 
  | 'index'        // 0-1 scale (HDI, GDI, etc.)
  | 'percentage'   // 0-100 scale
  | 'currency'     // Dollar amounts
  | 'years'        // Time in years
  | 'rate'         // Per capita rates
  | 'ratio'        // Deaths per 100,000, etc.
  | 'tonnes';      // CO2, material footprint

/**
 * Format indicator value based on type
 */
export function formatIndicatorValue(value: number, type: IndicatorType): string {
  switch (type) {
    case 'index':
      return value.toFixed(3);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    case 'years':
      return `${value.toFixed(1)} years`;
    case 'rate':
      return value.toFixed(2);
    case 'ratio':
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    case 'tonnes':
      return `${value.toFixed(2)} tonnes`;
    default:
      return value.toString();
  }
}

/**
 * Calculate year-over-year change
 */
export function calculateChange(current: number, previous: number): {
  absolute: number;
  percentage: number;
  formatted: string;
} {
  const absolute = current - previous;
  const percentage = previous !== 0 ? (absolute / previous) * 100 : 0;
  const sign = absolute > 0 ? '+' : '';
  
  return {
    absolute,
    percentage,
    formatted: `${sign}${absolute.toFixed(3)}`,
  };
}

/**
 * Calculate gender gap
 */
export function calculateGenderGap(male: number, female: number): {
  gap: number;
  percentage: number;
  formatted: string;
  favorsMale: boolean;
} {
  const gap = male - female;
  const average = (male + female) / 2;
  const percentage = average !== 0 ? (gap / average) * 100 : 0;
  
  return {
    gap,
    percentage: Math.abs(percentage),
    formatted: `${Math.abs(percentage).toFixed(1)}%`,
    favorsMale: gap > 0,
  };
}

/**
 * Determine trend direction from historical data
 */
export function getTrendDirection(history: HDRODataPoint[]): 'up' | 'down' | 'neutral' {
  if (history.length < 2) return 'neutral';
  
  const recent = history.slice(0, 3); // Last 3 years
  const values = recent.map(d => d.value);
  
  const increasing = values.every((val, idx) => 
    idx === 0 || val >= values[idx - 1]
  );
  
  const decreasing = values.every((val, idx) => 
    idx === 0 || val <= values[idx - 1]
  );
  
  if (increasing && values[0] > values[values.length - 1] + 0.001) return 'up';
  if (decreasing && values[0] < values[values.length - 1] - 0.001) return 'down';
  return 'neutral';
}

/**
 * Get performance color based on value vs benchmark
 */
export function getPerformanceColor(
  value: number,
  benchmark: number,
  higherIsBetter: boolean = true
): 'green' | 'yellow' | 'red' {
  const ratio = value / benchmark;
  
  if (higherIsBetter) {
    if (ratio >= 1.05) return 'green';
    if (ratio >= 0.95) return 'yellow';
    return 'red';
  } else {
    if (ratio <= 0.95) return 'green';
    if (ratio <= 1.05) return 'yellow';
    return 'red';
  }
}

/**
 * Get Tailwind color classes for performance
 */
export function getPerformanceColorClass(color: 'green' | 'yellow' | 'red'): string {
  switch (color) {
    case 'green':
      return 'text-data-green bg-data-green/10 border-data-green';
    case 'yellow':
      return 'text-yellow-600 bg-yellow-50 border-yellow-600';
    case 'red':
      return 'text-data-red bg-data-red/10 border-data-red';
  }
}

/**
 * Format year range for display
 */
export function formatYearRange(history: HDRODataPoint[]): string {
  if (history.length === 0) return 'No data';
  if (history.length === 1) return history[0].year.toString();
  
  const years = history.map(d => d.year).sort((a, b) => a - b);
  return `${years[0]}-${years[years.length - 1]}`;
}

/**
 * Get the most recent complete year of data
 */
export function getMostRecentYear(history: HDRODataPoint[]): number | null {
  if (history.length === 0) return null;
  return Math.max(...history.map(d => d.year));
}

/**
 * Calculate average annual growth rate
 */
export function calculateCAGR(history: HDRODataPoint[]): number | null {
  if (history.length < 2) return null;
  
  const sorted = [...history].sort((a, b) => a.year - b.year);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  
  const years = last.year - first.year;
  if (years === 0) return null;
  
  const cagr = (Math.pow(last.value / first.value, 1 / years) - 1) * 100;
  return cagr;
}

/**
 * Find Kenya's rank in comparison data
 */
export function findKenyaRank(comparison: Array<{ country: string; value: number }>): number {
  const sorted = [...comparison]
    .filter(c => !c.country.includes('Avg')) // Exclude averages
    .sort((a, b) => b.value - a.value);
  
  const kenyaIndex = sorted.findIndex(c => c.country === 'Kenya');
  return kenyaIndex + 1;
}

/**
 * Format gender data for display
 */
export function formatGenderData(data: GenderDataPoint, type: IndicatorType) {
  return {
    male: formatIndicatorValue(data.male, type),
    female: formatIndicatorValue(data.female, type),
    total: data.total ? formatIndicatorValue(data.total, type) : undefined,
    gap: calculateGenderGap(data.male, data.female),
  };
}

/**
 * Get indicator metadata
 */
export function getIndicatorMetadata(slug: string): {
  name: string;
  type: IndicatorType;
  higherIsBetter: boolean;
  unit: string;
  description: string;
} {
  const metadata: Record<string, ReturnType<typeof getIndicatorMetadata>> = {
    'hdi': {
      name: 'Human Development Index',
      type: 'index',
      higherIsBetter: true,
      unit: 'Index (0-1)',
      description: 'Composite index measuring average achievement in health, education, and income',
    },
    'ihdi': {
      name: 'Inequality-adjusted HDI',
      type: 'index',
      higherIsBetter: true,
      unit: 'Index (0-1)',
      description: 'HDI adjusted for inequality in the distribution of achievements',
    },
    'phdi': {
      name: 'Planetary Pressures-adjusted HDI',
      type: 'index',
      higherIsBetter: true,
      unit: 'Index (0-1)',
      description: 'HDI adjusted for planetary pressures (CO2 emissions and material footprint)',
    },
    'gdi': {
      name: 'Gender Development Index',
      type: 'index',
      higherIsBetter: true,
      unit: 'Index (0-1)',
      description: 'Measures gender gaps in human development achievements',
    },
    'gii': {
      name: 'Gender Inequality Index',
      type: 'index',
      higherIsBetter: false,
      unit: 'Index (0-1)',
      description: 'Measures gender-based disadvantage in reproductive health, empowerment, and labor market',
    },
    'mean-years-schooling': {
      name: 'Mean Years of Schooling',
      type: 'years',
      higherIsBetter: true,
      unit: 'Years',
      description: 'Average years of education received by people ages 25 and older',
    },
    'expected-years-schooling': {
      name: 'Expected Years of Schooling',
      type: 'years',
      higherIsBetter: true,
      unit: 'Years',
      description: 'Number of years of schooling a child is expected to receive',
    },
    'secondary-education': {
      name: 'Secondary Education Rate',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population (25+) with at least some secondary education',
    },
    'gni-per-capita': {
      name: 'GNI Per Capita',
      type: 'currency',
      higherIsBetter: true,
      unit: '2021 PPP$',
      description: 'Gross National Income per person in 2021 PPP dollars',
    },
    'labour-force': {
      name: 'Labour Force Participation',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population (15+) participating in the labor force',
    },
    'life-expectancy': {
      name: 'Life Expectancy',
      type: 'years',
      higherIsBetter: true,
      unit: 'Years',
      description: 'Expected number of years a newborn would live under current mortality patterns',
    },
    'maternal-mortality': {
      name: 'Maternal Mortality Ratio',
      type: 'ratio',
      higherIsBetter: false,
      unit: 'Deaths per 100,000',
      description: 'Number of maternal deaths per 100,000 live births',
    },
    'adolescent-birth-rate': {
      name: 'Adolescent Birth Rate',
      type: 'ratio',
      higherIsBetter: false,
      unit: 'Births per 1,000',
      description: 'Number of births per 1,000 women ages 15-19',
    },
    'co2-emissions': {
      name: 'CO2 Emissions Per Capita',
      type: 'tonnes',
      higherIsBetter: false,
      unit: 'Tonnes',
      description: 'Carbon dioxide emissions per person (production-based)',
    },
    'material-footprint': {
      name: 'Material Footprint Per Capita',
      type: 'tonnes',
      higherIsBetter: false,
      unit: 'Tonnes',
      description: 'Total amount of raw materials extracted to meet consumption needs',
    },
    'electricity': {
      name: 'Access to Electricity',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population with access to electricity',
    },
    'water': {
      name: 'Access to Clean Water',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population with access to improved drinking water sources',
    },
    'sanitation': {
      name: 'Access to Sanitation',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population with access to improved sanitation facilities',
    },
    'cooking-fuel': {
      name: 'Clean Cooking Fuel',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population using clean cooking fuels and technologies',
    },
    'housing': {
      name: 'Housing Quality',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Percentage of population with adequate housing',
    },
    'parliament': {
      name: 'Parliamentary Representation',
      type: 'percentage',
      higherIsBetter: true,
      unit: 'Percentage',
      description: 'Share of seats in parliament by gender',
    },
    'mpi': {
      name: 'Multidimensional Poverty Index',
      type: 'index',
      higherIsBetter: false,
      unit: 'Index (0-1)',
      description: 'Measures acute multidimensional poverty across health, education, and living standards',
    },
  };
  
  return metadata[slug] || {
    name: slug,
    type: 'index',
    higherIsBetter: true,
    unit: '',
    description: '',
  };
}
