import { Indicator, TrendDirection } from '@/types';
import { fetchAllHDROIndicators } from './client';
import { getIndicatorMetadata, getTrendDirection } from './formatters';
import { HDROResponse, GenderResponse } from './types';

/**
 * Convert HDRO response to standard Indicator format
 */
function convertToIndicator(
  slug: string, 
  data: HDROResponse | GenderResponse
): Indicator {
  const metadata = getIndicatorMetadata(slug);
  
  let currentVal: number;
  let currentYear: number;
  let historyData: { year: number; value: number }[];

  if ('male' in data.kenya.current) {
    // GenderResponse
    const genderData = data as GenderResponse;
    const currentGender = genderData.kenya.current;
    
    // Use total if available, otherwise average
    currentVal = currentGender.total ?? (currentGender.male + currentGender.female) / 2;
    currentYear = currentGender.year;
    
    historyData = genderData.kenya.history.map(h => ({
      year: h.year,
      value: h.total ?? (h.male + h.female) / 2
    }));
  } else {
    // HDROResponse
    const hdroData = data as HDROResponse;
    currentVal = hdroData.kenya.current.value;
    currentYear = hdroData.kenya.current.year;
    historyData = hdroData.kenya.history;
  }
  
  // Determine category based on metadata or fallback
  let category: any = 'society'; // Default to society for HDI/development
  if (['hdi', 'ihdi', 'phdi'].includes(slug)) category = 'society';
  else if (['gdi', 'gii'].includes(slug)) category = 'society';
  else if (['mean-years-schooling', 'expected-years-schooling', 'secondary-education'].includes(slug)) category = 'education';
  else if (['gni-per-capita', 'labour-force'].includes(slug)) category = 'economy';
  else if (['life-expectancy', 'maternal-mortality', 'adolescent-birth-rate'].includes(slug)) category = 'health';
  else if (['co2-emissions', 'material-footprint'].includes(slug)) category = 'environment';
  else if (['electricity', 'water', 'sanitation', 'cooking-fuel', 'housing'].includes(slug)) category = 'society';
  else if (['parliament', 'mpi'].includes(slug)) category = 'governance';

  // Map trend direction to strict type
  const trend: TrendDirection = getTrendDirection(historyData);

  return {
    id: `hdro-${slug}`,
    name: metadata.name,
    // Prefix slug with 'hdro/' so the generic IndicatorsList links to /indicators/hdro/[slug]
    slug: `hdro/${slug}`, 
    category,
    description: metadata.description,
    year: currentYear,
    score: currentVal,
    rank: 0, // Rank not currently available in API response
    totalCountries: 193, // Standard for HDRO
    trend,
    trendData: historyData,
    source: 'UNDP Human Development Reports',
    sourceUrl: 'https://hdr.undp.org/data-center/human-development-index',
    methodology: metadata.description,
    unit: metadata.unit || '',
    higherIsBetter: metadata.higherIsBetter,
    lastUpdated: new Date().toISOString(),
    updateFrequency: 'Annually'
  };
}

/**
 * Fetch all HDRO indicators and convert to standard format
 */
export async function getAllHDROIndicatorsAsStandard(): Promise<Indicator[]> {
  try {
    const allData = await fetchAllHDROIndicators();
    const indicators: Indicator[] = [];

    // Helper to process a group of indicators
    const processGroup = (group: Record<string, HDROResponse | GenderResponse>, slugs: string[]) => {
      Object.entries(group).forEach(([key, data], index) => {
        // We need to map the object key to the actual slug
        // The keys in fetchAllHDROIndicators return object match the variable names, not necessarily slugs
        // But let's look at how they are constructed in client.ts
        
        // coreIndices: { hdi, ihdi, phdi }
        // genderMetrics: { gdi, gii }
        // etc.
        
        // We can use the slugs array to map correctly if we iterate carefully
        // Or we can just manually map them here
      });
    };

    // Manually map each known indicator
    if (allData.coreIndices.hdi) indicators.push(convertToIndicator('hdi', allData.coreIndices.hdi));
    if (allData.coreIndices.ihdi) indicators.push(convertToIndicator('ihdi', allData.coreIndices.ihdi));
    if (allData.coreIndices.phdi) indicators.push(convertToIndicator('phdi', allData.coreIndices.phdi));

    if (allData.genderMetrics.gdi) indicators.push(convertToIndicator('gdi', allData.genderMetrics.gdi));
    if (allData.genderMetrics.gii) indicators.push(convertToIndicator('gii', allData.genderMetrics.gii));

    if (allData.education.meanYears) indicators.push(convertToIndicator('mean-years-schooling', allData.education.meanYears));
    if (allData.education.expectedYears) indicators.push(convertToIndicator('expected-years-schooling', allData.education.expectedYears));
    if (allData.education.secondary) indicators.push(convertToIndicator('secondary-education', allData.education.secondary));

    if (allData.economic.gni) indicators.push(convertToIndicator('gni-per-capita', allData.economic.gni));
    if (allData.economic.labourForce) indicators.push(convertToIndicator('labour-force', allData.economic.labourForce));

    if (allData.health.lifeExpectancy) indicators.push(convertToIndicator('life-expectancy', allData.health.lifeExpectancy));
    if (allData.health.maternalMortality) indicators.push(convertToIndicator('maternal-mortality', allData.health.maternalMortality));
    if (allData.health.adolescentBirthRate) indicators.push(convertToIndicator('adolescent-birth-rate', allData.health.adolescentBirthRate));

    if (allData.environment.co2) indicators.push(convertToIndicator('co2-emissions', allData.environment.co2));
    if (allData.environment.materialFootprint) indicators.push(convertToIndicator('material-footprint', allData.environment.materialFootprint));

    if (allData.livingStandards.electricity) indicators.push(convertToIndicator('electricity', allData.livingStandards.electricity));
    if (allData.livingStandards.water) indicators.push(convertToIndicator('water', allData.livingStandards.water));
    if (allData.livingStandards.sanitation) indicators.push(convertToIndicator('sanitation', allData.livingStandards.sanitation));
    if (allData.livingStandards.cookingFuel) indicators.push(convertToIndicator('cooking-fuel', allData.livingStandards.cookingFuel));
    if (allData.livingStandards.housing) indicators.push(convertToIndicator('housing', allData.livingStandards.housing));

    if (allData.governance.parliament) indicators.push(convertToIndicator('parliament', allData.governance.parliament));
    if (allData.governance.mpi) indicators.push(convertToIndicator('mpi', allData.governance.mpi));

    return indicators;
  } catch (error) {
    console.error('Error converting HDRO indicators:', error);
    return [];
  }
}

/**
 * Get key HDRO indicators for the home page
 */
export async function getKeyHDROIndicatorsAsStandard(): Promise<Indicator[]> {
  try {
    const allData = await fetchAllHDROIndicators();
    const indicators: Indicator[] = [];

    // Select key indicators
    if (allData.coreIndices.hdi) indicators.push(convertToIndicator('hdi', allData.coreIndices.hdi));
    if (allData.economic.gni) indicators.push(convertToIndicator('gni-per-capita', allData.economic.gni));
    if (allData.health.lifeExpectancy) indicators.push(convertToIndicator('life-expectancy', allData.health.lifeExpectancy));
    if (allData.education.meanYears) indicators.push(convertToIndicator('mean-years-schooling', allData.education.meanYears));

    return indicators;
  } catch (error) {
    console.error('Error fetching key HDRO indicators:', error);
    return [];
  }
}
