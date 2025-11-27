// Client-side data fetching functions for HDRO indicators

import type { HDROResponse, GenderResponse } from './types';

const API_BASE = typeof window === 'undefined' 
  ? 'http://localhost:3000/api'  // Server-side
  : '/api';  // Client-side

/**
 * Generic fetch function with error handling
 */
async function fetchHDROData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  
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
  return fetchHDROData<HDROResponse>('/hdi');
}

export async function fetchIHDI() {
  return fetchHDROData<HDROResponse>('/ihdi');
}

export async function fetchPHDI() {
  return fetchHDROData<HDROResponse>('/phdi');
}

// ============================================================================
// GENDER EQUALITY METRICS
// ============================================================================

export async function fetchGDI() {
  return fetchHDROData<HDROResponse>('/gdi');
}

export async function fetchGII() {
  return fetchHDROData<HDROResponse>('/gii');
}

// ============================================================================
// EDUCATION INDICATORS
// ============================================================================

export async function fetchMeanYearsSchooling() {
  return fetchHDROData<GenderResponse>('/education/mean-years-schooling');
}

export async function fetchExpectedYearsSchooling() {
  return fetchHDROData<GenderResponse>('/education/expected-years-schooling');
}

export async function fetchSecondaryEducation() {
  return fetchHDROData<GenderResponse>('/education/secondary-education');
}

// ============================================================================
// ECONOMIC INDICATORS
// ============================================================================

export async function fetchGNIPerCapita() {
  return fetchHDROData<GenderResponse>('/economic/gni-per-capita');
}

export async function fetchLabourForce() {
  return fetchHDROData<GenderResponse>('/economic/labour-force');
}

// ============================================================================
// HEALTH INDICATORS
// ============================================================================

export async function fetchLifeExpectancy() {
  return fetchHDROData<GenderResponse>('/health/life-expectancy');
}

export async function fetchMaternalMortality() {
  return fetchHDROData<HDROResponse>('/health/maternal-mortality');
}

export async function fetchAdolescentBirthRate() {
  return fetchHDROData<HDROResponse>('/health/adolescent-birth-rate');
}

// ============================================================================
// ENVIRONMENTAL INDICATORS
// ============================================================================

export async function fetchCO2Emissions() {
  return fetchHDROData<HDROResponse>('/environment/co2-emissions');
}

export async function fetchMaterialFootprint() {
  return fetchHDROData<HDROResponse>('/environment/material-footprint');
}

// ============================================================================
// LIVING STANDARDS
// ============================================================================

export async function fetchElectricityAccess() {
  return fetchHDROData<HDROResponse>('/living-standards/electricity');
}

export async function fetchWaterAccess() {
  return fetchHDROData<HDROResponse>('/living-standards/water');
}

export async function fetchSanitationAccess() {
  return fetchHDROData<HDROResponse>('/living-standards/sanitation');
}

export async function fetchCookingFuelAccess() {
  return fetchHDROData<HDROResponse>('/living-standards/cooking-fuel');
}

export async function fetchHousingQuality() {
  return fetchHDROData<HDROResponse>('/living-standards/housing');
}

// ============================================================================
// GOVERNANCE & POVERTY
// ============================================================================

export async function fetchParliamentRepresentation() {
  return fetchHDROData<GenderResponse>('/governance/parliament');
}

export async function fetchMPI() {
  return fetchHDROData<HDROResponse>('/poverty/mpi');
}

// ============================================================================
// BATCH FETCHING
// ============================================================================

/**
 * Fetch all core indices at once
 */
export async function fetchCoreIndices() {
  const [hdi, ihdi, phdi] = await Promise.all([
    fetchHDI(),
    fetchIHDI(),
    fetchPHDI(),
  ]);
  
  return { hdi, ihdi, phdi };
}

/**
 * Fetch all gender equality metrics
 */
export async function fetchGenderMetrics() {
  const [gdi, gii] = await Promise.all([
    fetchGDI(),
    fetchGII(),
  ]);
  
  return { gdi, gii };
}

/**
 * Fetch all education indicators
 */
export async function fetchEducationIndicators() {
  const [meanYears, expectedYears, secondary] = await Promise.all([
    fetchMeanYearsSchooling(),
    fetchExpectedYearsSchooling(),
    fetchSecondaryEducation(),
  ]);
  
  return { meanYears, expectedYears, secondary };
}

/**
 * Fetch all economic indicators
 */
export async function fetchEconomicIndicators() {
  const [gni, labourForce] = await Promise.all([
    fetchGNIPerCapita(),
    fetchLabourForce(),
  ]);
  
  return { gni, labourForce };
}

/**
 * Fetch all health indicators
 */
export async function fetchHealthIndicators() {
  const [lifeExpectancy, maternalMortality, adolescentBirthRate] = await Promise.all([
    fetchLifeExpectancy(),
    fetchMaternalMortality(),
    fetchAdolescentBirthRate(),
  ]);
  
  return { lifeExpectancy, maternalMortality, adolescentBirthRate };
}

/**
 * Fetch all environmental indicators
 */
export async function fetchEnvironmentIndicators() {
  const [co2, materialFootprint] = await Promise.all([
    fetchCO2Emissions(),
    fetchMaterialFootprint(),
  ]);
  
  return { co2, materialFootprint };
}

/**
 * Fetch all living standards indicators
 */
export async function fetchLivingStandards() {
  const [electricity, water, sanitation, cookingFuel, housing] = await Promise.all([
    fetchElectricityAccess(),
    fetchWaterAccess(),
    fetchSanitationAccess(),
    fetchCookingFuelAccess(),
    fetchHousingQuality(),
  ]);
  
  return { electricity, water, sanitation, cookingFuel, housing };
}

/**
 * Fetch all governance indicators
 */
export async function fetchGovernanceIndicators() {
  const [parliament, mpi] = await Promise.all([
    fetchParliamentRepresentation(),
    fetchMPI(),
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
