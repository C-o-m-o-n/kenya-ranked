import { HDRORawDataItem, HDRODataPoint, HDROComparisonPoint, GenderDataPoint, NEIGHBORS } from './types';

const HDRO_API_BASE = 'https://hdrdata.org/api/CompositeIndices';
const HDRO_API_KEY = process.env.HDRO_API_KEY || 'HDR-V279I4a6nHC2N58lJjXRpxBaN0IVj9J9';

/**
 * Fetch data from HDRO API for a specific country
 */
export async function fetchHDROData(countryCode: string): Promise<HDRORawDataItem[]> {
  const url = `${HDRO_API_BASE}/query?apikey=${HDRO_API_KEY}&countryOrAggregation=${countryCode}`;
  // console.log(`[HDRO Utils] Fetching: ${url}`);
  
  try {
    const response = await fetch(url, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KenyaRanked/1.0;)',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HDRO API Error (${countryCode}): ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
        const text = await response.text();
        console.error(`[HDRO Utils] Received HTML instead of JSON:`, text.substring(0, 200));
        throw new Error(`HDRO API returned HTML instead of JSON`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`[HDRO Utils] Fetch failed for ${countryCode}:`, error);
    throw error;
  }
}

/**
 * Filter and parse single indicator data
 */
export function filterIndicator(
  data: HDRORawDataItem[],
  indexName: string,
  indicatorName: string
): HDRODataPoint[] {
  return data
    .filter((item) =>
      item.index === indexName &&
      item.indicator === indicatorName &&
      item.value &&
      item.value !== '..'
    )
    .map((item) => ({
      year: parseInt(item.year),
      value: parseFloat(item.value)
    }))
    .sort((a, b) => b.year - a.year);
}

/**
 * Filter and parse gender-disaggregated data
 */
export function filterGenderIndicator(
  data: HDRORawDataItem[],
  indexName: string,
  maleIndicator: string,
  femaleIndicator: string,
  totalIndicator?: string
): GenderDataPoint[] {
  const years = new Set<number>();
  const maleData = new Map<number, number>();
  const femaleData = new Map<number, number>();
  const totalData = new Map<number, number>();

  // Parse male data
  data
    .filter((item) => item.index === indexName && item.indicator === maleIndicator && item.value !== '..')
    .forEach((item) => {
      const year = parseInt(item.year);
      years.add(year);
      maleData.set(year, parseFloat(item.value));
    });

  // Parse female data
  data
    .filter((item) => item.index === indexName && item.indicator === femaleIndicator && item.value !== '..')
    .forEach((item) => {
      const year = parseInt(item.year);
      years.add(year);
      femaleData.set(year, parseFloat(item.value));
    });

  // Parse total data if provided
  if (totalIndicator) {
    data
      .filter((item) => item.index === indexName && item.indicator === totalIndicator && item.value !== '..')
      .forEach((item) => {
        const year = parseInt(item.year);
        years.add(year);
        totalData.set(year, parseFloat(item.value));
      });
  }

  // Combine data by year
  const result: GenderDataPoint[] = [];
  years.forEach((year) => {
    const male = maleData.get(year);
    const female = femaleData.get(year);
    const total = totalData.get(year);

    if (male !== undefined && female !== undefined) {
      result.push({
        year,
        male,
        female,
        ...(total !== undefined && { total })
      });
    }
  });

  return result.sort((a, b) => b.year - a.year);
}

/**
 * Fetch comparison data for neighboring countries
 */
export async function fetchComparisonData(
  indexName: string,
  indicatorName: string,
  kenyaValue: number
): Promise<HDROComparisonPoint[]> {
  const comparison: HDROComparisonPoint[] = [
    { country: 'Kenya', value: kenyaValue }
  ];

  for (const neighbor of NEIGHBORS) {
    try {
      const data = await fetchHDROData(neighbor.code);
      const filtered = filterIndicator(data, indexName, indicatorName);
      
      if (filtered.length > 0) {
        comparison.push({
          country: neighbor.name,
          value: filtered[0].value
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${neighbor.name}`, e);
    }
  }

  return comparison;
}

/**
 * Add regional averages to comparison data
 * Note: These are static values that should be updated periodically
 */
export function addRegionalAverages(
  comparison: HDROComparisonPoint[],
  averages: { eastAfrica?: number; africa?: number; world?: number }
): HDROComparisonPoint[] {
  const result = [...comparison];
  
  if (averages.eastAfrica !== undefined) {
    result.push({ country: 'East Africa Avg', value: averages.eastAfrica });
  }
  
  if (averages.africa !== undefined) {
    result.push({ country: 'Africa Avg', value: averages.africa });
  }
  
  if (averages.world !== undefined) {
    result.push({ country: 'World Avg', value: averages.world });
  }
  
  return result;
}

/**
 * Generic function to build a standard HDRO response
 */
export async function buildHDROResponse(
  indexName: string,
  indicatorName: string,
  regionalAverages?: { eastAfrica?: number; africa?: number; world?: number }
) {
  const kenyaData = await fetchHDROData('KEN');
  const history = filterIndicator(kenyaData, indexName, indicatorName);
  
  if (history.length === 0) {
    throw new Error(`No data found for ${indicatorName}`);
  }
  
  const current = history[0];
  let comparison = await fetchComparisonData(indexName, indicatorName, current.value);
  
  if (regionalAverages) {
    comparison = addRegionalAverages(comparison, regionalAverages);
  }
  
  return {
    kenya: {
      current,
      history
    },
    comparison
  };
}

/**
 * Generic function to build a gender-disaggregated HDRO response
 */
export async function buildGenderHDROResponse(
  indexName: string,
  maleIndicator: string,
  femaleIndicator: string,
  totalIndicator?: string,
  regionalAverages?: { eastAfrica?: number; africa?: number; world?: number }
) {
  const kenyaData = await fetchHDROData('KEN');
  const history = filterGenderIndicator(kenyaData, indexName, maleIndicator, femaleIndicator, totalIndicator);
  
  if (history.length === 0) {
    throw new Error(`No gender data found for ${maleIndicator} / ${femaleIndicator}`);
  }
  
  const current = history[0];
  
  // Use total if available, otherwise average of male and female
  const currentValue = current.total ?? (current.male + current.female) / 2;
  
  let comparison = await fetchComparisonData(
    indexName,
    totalIndicator || maleIndicator,
    currentValue
  );
  
  if (regionalAverages) {
    comparison = addRegionalAverages(comparison, regionalAverages);
  }
  
  return {
    kenya: {
      current,
      history
    },
    comparison
  };
}
