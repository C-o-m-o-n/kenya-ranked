// Client-side data fetching functions for HDRO indicators

import type { HDROResponse, GenderResponse } from './types';
import * as services from './services';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '/api';
  if (process.env.NEXT_PUBLIC_APP_URL) return `${process.env.NEXT_PUBLIC_APP_URL}/api`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
  return 'http://localhost:3000/api';
};

const API_BASE = getBaseUrl();

/**
 * Generic fetch function with error handling
 */
async function fetchHDROData<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  console.log(`[HDRO Client] Fetching: ${url}`);
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || error.error || 'Failed to fetch data');
  }
  
  return response.json();
}

// ============================================================================
// CORE DEVELOPMENT INDICES
// ============================================================================

export async function fetchHDI() {
  if (typeof window === 'undefined') return services.getHDI();
  return fetchHDROData<HDROResponse>('/hdi');
}

export async function fetchIHDI() {
  if (typeof window === 'undefined') return services.getIHDI();
  return fetchHDROData<HDROResponse>('/ihdi');
}

export async function fetchPHDI() {
  if (typeof window === 'undefined') return services.getPHDI();
  return fetchHDROData<HDROResponse>('/phdi');
}

// ============================================================================
// GENDER EQUALITY METRICS
// ============================================================================

export async function fetchGDI() {
  if (typeof window === 'undefined') return services.getGDI();
  return fetchHDROData<HDROResponse>('/gdi');
}

export async function fetchGII() {
  if (typeof window === 'undefined') return services.getGII();
  return fetchHDROData<HDROResponse>('/gii');
}

// ============================================================================
// EDUCATION INDICATORS
// ============================================================================

export async function fetchMeanYearsSchooling() {
  if (typeof window === 'undefined') return services.getMeanYearsSchooling();
  return fetchHDROData<GenderResponse>('/education/mean-years-schooling');
}

export async function fetchExpectedYearsSchooling() {
  if (typeof window === 'undefined') return services.getExpectedYearsSchooling();
  return fetchHDROData<GenderResponse>('/education/expected-years-schooling');
}

export async function fetchSecondaryEducation() {
  if (typeof window === 'undefined') return services.getSecondaryEducation();
  return fetchHDROData<GenderResponse>('/education/secondary-education');
}

// ============================================================================
// ECONOMIC INDICATORS
// ============================================================================

export async function fetchGNIPerCapita() {
  if (typeof window === 'undefined') return services.getGNIPerCapita();
  return fetchHDROData<GenderResponse>('/economic/gni-per-capita');
}

export async function fetchLabourForce() {
  if (typeof window === 'undefined') return services.getLabourForce();
  return fetchHDROData<GenderResponse>('/economic/labour-force');
}

// ============================================================================
// HEALTH INDICATORS
// ============================================================================

export async function fetchLifeExpectancy() {
  if (typeof window === 'undefined') return services.getLifeExpectancy();
  return fetchHDROData<GenderResponse>('/health/life-expectancy');
}

export async function fetchMaternalMortality() {
  if (typeof window === 'undefined') return services.getMaternalMortality();
  return fetchHDROData<HDROResponse>('/health/maternal-mortality');
}

export async function fetchAdolescentBirthRate() {
  if (typeof window === 'undefined') return services.getAdolescentBirthRate();
  return fetchHDROData<HDROResponse>('/health/adolescent-birth-rate');
}

// ============================================================================
// ENVIRONMENTAL INDICATORS
// ============================================================================

export async function fetchCO2Emissions() {
  if (typeof window === 'undefined') return services.getCO2Emissions();
  return fetchHDROData<HDROResponse>('/environment/co2-emissions');
}

export async function fetchMaterialFootprint() {
  if (typeof window === 'undefined') return services.getMaterialFootprint();
  return fetchHDROData<HDROResponse>('/environment/material-footprint');
}

// ============================================================================
// LIVING STANDARDS
// ============================================================================

export async function fetchElectricityAccess() {
  if (typeof window === 'undefined') return services.getElectricityAccess();
  return fetchHDROData<HDROResponse>('/living-standards/electricity');
}

export async function fetchWaterAccess() {
  if (typeof window === 'undefined') return services.getWaterAccess();
  return fetchHDROData<HDROResponse>('/living-standards/water');
}

export async function fetchSanitationAccess() {
  if (typeof window === 'undefined') return services.getSanitationAccess();
  return fetchHDROData<HDROResponse>('/living-standards/sanitation');
}

export async function fetchCookingFuelAccess() {
  if (typeof window === 'undefined') return services.getCookingFuelAccess();
  return fetchHDROData<HDROResponse>('/living-standards/cooking-fuel');
}

export async function fetchHousingQuality() {
  if (typeof window === 'undefined') return services.getHousingQuality();
  return fetchHDROData<HDROResponse>('/living-standards/housing');
}

// ============================================================================
// GOVERNANCE & POVERTY
// ============================================================================

export async function fetchParliamentRepresentation() {
  if (typeof window === 'undefined') return services.getParliamentRepresentation();
  return fetchHDROData<GenderResponse>('/governance/parliament');
}

export async function fetchMPI() {
  if (typeof window === 'undefined') return services.getMPI();
  return fetchHDROData<HDROResponse>('/poverty/mpi');
}

// ============================================================================
// BATCH FETCHING
// ============================================================================

/**
 * Helper to safely fetch data without throwing
 */
async function safeFetch<T>(promise: Promise<T>): Promise<T | undefined> {
  try {
    return await promise;
  } catch (e) {
    console.error('[HDRO Client] Fetch failed:', e);
    return undefined;
  }
}

// ============================================================================
// BATCH FETCHING
// ============================================================================

/**
 * Fetch all core indices at once
 */
export async function fetchCoreIndices() {
  const [hdi, ihdi, phdi] = await Promise.all([
    safeFetch(fetchHDI()),
    safeFetch(fetchIHDI()),
    safeFetch(fetchPHDI()),
  ]);
  
  return { hdi, ihdi, phdi };
}

/**
 * Fetch all gender equality metrics
 */
export async function fetchGenderMetrics() {
  const [gdi, gii] = await Promise.all([
    safeFetch(fetchGDI()),
    safeFetch(fetchGII()),
  ]);
  
  return { gdi, gii };
}

/**
 * Fetch all education indicators
 */
export async function fetchEducationIndicators() {
  const [meanYears, expectedYears, secondary] = await Promise.all([
    safeFetch(fetchMeanYearsSchooling()),
    safeFetch(fetchExpectedYearsSchooling()),
    safeFetch(fetchSecondaryEducation()),
  ]);
  
  return { meanYears, expectedYears, secondary };
}

/**
 * Fetch all economic indicators
 */
export async function fetchEconomicIndicators() {
  const [gni, labourForce] = await Promise.all([
    safeFetch(fetchGNIPerCapita()),
    safeFetch(fetchLabourForce()),
  ]);
  
  return { gni, labourForce };
}

/**
 * Fetch all health indicators
 */
export async function fetchHealthIndicators() {
  const [lifeExpectancy, maternalMortality, adolescentBirthRate] = await Promise.all([
    safeFetch(fetchLifeExpectancy()),
    safeFetch(fetchMaternalMortality()),
    safeFetch(fetchAdolescentBirthRate()),
  ]);
  
  return { lifeExpectancy, maternalMortality, adolescentBirthRate };
}

/**
 * Fetch all environmental indicators
 */
export async function fetchEnvironmentIndicators() {
  const [co2, materialFootprint] = await Promise.all([
    safeFetch(fetchCO2Emissions()),
    safeFetch(fetchMaterialFootprint()),
  ]);
  
  return { co2, materialFootprint };
}

/**
 * Fetch all living standards indicators
 */
export async function fetchLivingStandards() {
  const [electricity, water, sanitation, cookingFuel, housing] = await Promise.all([
    safeFetch(fetchElectricityAccess()),
    safeFetch(fetchWaterAccess()),
    safeFetch(fetchSanitationAccess()),
    safeFetch(fetchCookingFuelAccess()),
    safeFetch(fetchHousingQuality()),
  ]);
  
  return { electricity, water, sanitation, cookingFuel, housing };
}

/**
 * Fetch all governance indicators
 */
export async function fetchGovernanceIndicators() {
  const [parliament, mpi] = await Promise.all([
    safeFetch(fetchParliamentRepresentation()),
    safeFetch(fetchMPI()),
  ]);
  
  return { parliament, mpi };
}

/**
 * Fetch ALL HDRO indicators at once
 */
export async function fetchAllHDROIndicators() {
  const [
    coreIndices,
    genderMetrics,
    education,
    economic,
    health,
    environment,
    livingStandards,
    governance,
  ] = await Promise.all([
    fetchCoreIndices(),
    fetchGenderMetrics(),
    fetchEducationIndicators(),
    fetchEconomicIndicators(),
    fetchHealthIndicators(),
    fetchEnvironmentIndicators(),
    fetchLivingStandards(),
    fetchGovernanceIndicators(),
  ]);
  
  return {
    coreIndices,
    genderMetrics,
    education,
    economic,
    health,
    environment,
    livingStandards,
    governance,
  };
}
