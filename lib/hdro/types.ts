// HDRO API Types and Interfaces

export interface HDRODataPoint {
  year: number;
  value: number;
}

export interface HDROComparisonPoint {
  country: string;
  value: number;
}

export interface HDROResponse<T = HDRODataPoint> {
  kenya: {
    current: T;
    history: T[];
  };
  comparison: HDROComparisonPoint[];
}

export interface GenderDataPoint {
  year: number;
  male: number;
  female: number;
  total?: number;
}

export interface GenderResponse {
  kenya: {
    current: GenderDataPoint;
    history: GenderDataPoint[];
  };
  comparison: HDROComparisonPoint[];
}

// Raw API response types
export interface HDRORawDataItem {
  index: string;
  indicator: string;
  year: string;
  value: string;
  country_code: string;
  country_name: string;
}

// Indicator codes
export const INDICATORS = {
  // Core Indices
  HDI: 'hdi - Human Development Index (value)',
  IHDI: 'ihdi - Inequality-adjusted Human Development Index (value)',
  PHDI: 'phdi - Planetary pressures–adjusted Human Development Index (value)',
  HDI_RANK: 'hdi_rank - HDI Rank',
  
  // Gender Indices
  GDI: 'gdi - Gender Development Index (value)',
  GII: 'gii - Gender Inequality Index (value)',
  GII_RANK: 'gii_rank - GII Rank',
  
  // Education
  MEAN_YEARS_SCHOOLING: 'mys - Mean Years of Schooling (years)',
  MEAN_YEARS_SCHOOLING_F: 'mys_f - Mean Years of Schooling, female (years)',
  MEAN_YEARS_SCHOOLING_M: 'mys_m - Mean Years of Schooling, male (years)',
  EXPECTED_YEARS_SCHOOLING: 'eys - Expected Years of Schooling (years)',
  EXPECTED_YEARS_SCHOOLING_F: 'eys_f - Expected Years of Schooling, female (years)',
  EXPECTED_YEARS_SCHOOLING_M: 'eys_m - Expected Years of Schooling, male (years)',
  SECONDARY_EDUCATION_F: 'se_f - Population with at least some secondary education, female (% ages 25 and older)',
  SECONDARY_EDUCATION_M: 'se_m - Population with at least some secondary education, male (% ages 25 and older)',
  SCHOOL_ATTENDANCE: 'school_attendance - School attendance (%)',
  
  // Economic
  GNI_PER_CAPITA: 'gnipc - Gross National Income Per Capita (2021 PPP$)',
  GNI_PER_CAPITA_F: 'gni_pc_f - Gross National Income Per Capita, female (2021 PPP$)',
  GNI_PER_CAPITA_M: 'gni_pc_m - Gross National Income Per Capita, male (2021 PPP$)',
  LABOUR_FORCE_F: 'lfpr_f - Labour force participation rate, female (% ages 15 and older)',
  LABOUR_FORCE_M: 'lfpr_m - Labour force participation rate, male (% ages 15 and older)',
  INCOME_INEQUALITY: 'ineq_inc - Inequality in income',
  
  // Health
  LIFE_EXPECTANCY: 'le - Life Expectancy at Birth (years)',
  LIFE_EXPECTANCY_F: 'le_f - Life Expectancy at Birth, female (years)',
  LIFE_EXPECTANCY_M: 'le_m - Life Expectancy at Birth, male (years)',
  MATERNAL_MORTALITY: 'mmr - Maternal Mortality Ratio (deaths per 100,000 live births)',
  CHILD_MORTALITY: 'child_mortality - Child mortality (%)',
  ADOLESCENT_BIRTH_RATE: 'abr - Adolescent Birth Rate (births per 1,000 women ages 15-19)',
  LIFE_EXPECTANCY_INEQUALITY: 'ineq_le - Inequality in life expectancy',
  
  // Environment
  CO2_EMISSIONS: 'co2_prod - Carbon dioxide emissions per capita (production) (tonnes)',
  MATERIAL_FOOTPRINT: 'mf - Material footprint per capita (tonnes)',
  
  // Living Standards
  ELECTRICITY: 'electricity - Electricity (%)',
  DRINKING_WATER: 'drinking_water - Drinking water (%)',
  SANITATION: 'sanitation - Sanitation (%)',
  COOKING_FUEL: 'cooking_fuel - Cooking fuel (%)',
  HOUSING: 'housing - Housing (%)',
  ASSETS: 'assets - Assets (%)',
  NUTRITION: 'nutrition - Nutrition (%)',
  
  // Governance
  PARLIAMENT_SEATS_F: 'pr_f - Share of seats in parliament, female (% held by women)',
  PARLIAMENT_SEATS_M: 'pr_m - Share of seats in parliament, male (% held by men)',
  MPI: 'mpi_value - MPI Value (Range: 0 to 1)',
  
  // Inequality
  COEFFICIENT_INEQUALITY: 'coef_ineq - Coefficient of human inequality',
  INEQUALITY_EDUCATION: 'ineq_edu - Inequality in eduation',
  OVERALL_LOSS: 'loss - Overall loss (%)',
} as const;

// Index names
export const INDICES = {
  HDI: 'HDI - Human Development Index',
  IHDI: 'IHDI - Inequality-adjusted Human Development Index',
  PHDI: 'PHDI - Planetary pressures–adjusted Human Development Index',
  GDI: 'GDI - Gender Development Index',
  GII: 'GII - Gender Inequality Index',
  MPI: 'MPI - Multidimensional Poverty Index',
} as const;

// Regional neighbors for comparison
export const NEIGHBORS = [
  { code: 'RWA', name: 'Rwanda' },
  { code: 'TZA', name: 'Tanzania' },
  { code: 'UGA', name: 'Uganda' },
  { code: 'ETH', name: 'Ethiopia' },
  { code: 'SOM', name: 'Somalia' },
] as const;

// Regional and global averages (these are approximations, update as needed)
export const REGIONAL_AVERAGES = {
  EAST_AFRICA: 'East Africa Avg',
  AFRICA: 'Africa Avg',
  WORLD: 'World Avg',
} as const;
