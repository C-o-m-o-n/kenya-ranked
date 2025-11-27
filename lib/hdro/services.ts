import { buildHDROResponse, buildGenderHDROResponse } from './utils';
import { INDICES, INDICATORS } from './types';

// ============================================================================
// CORE DEVELOPMENT INDICES
// ============================================================================

export const getHDI = () => buildHDROResponse(INDICES.HDI, INDICATORS.HDI, { eastAfrica: 0.558, africa: 0.547, world: 0.739 });
export const getIHDI = () => buildHDROResponse(INDICES.IHDI, INDICATORS.IHDI);
export const getPHDI = () => buildHDROResponse(INDICES.PHDI, INDICATORS.PHDI);

// ============================================================================
// GENDER EQUALITY METRICS
// ============================================================================

export const getGDI = () => buildHDROResponse(INDICES.GDI, INDICATORS.GDI);
export const getGII = () => buildHDROResponse(INDICES.GII, INDICATORS.GII);

// ============================================================================
// EDUCATION INDICATORS
// ============================================================================

export const getMeanYearsSchooling = () => buildGenderHDROResponse(INDICES.HDI, INDICATORS.MEAN_YEARS_SCHOOLING_M, INDICATORS.MEAN_YEARS_SCHOOLING_F, INDICATORS.MEAN_YEARS_SCHOOLING);
export const getExpectedYearsSchooling = () => buildGenderHDROResponse(INDICES.HDI, INDICATORS.EXPECTED_YEARS_SCHOOLING_M, INDICATORS.EXPECTED_YEARS_SCHOOLING_F, INDICATORS.EXPECTED_YEARS_SCHOOLING);
export const getSecondaryEducation = () => buildGenderHDROResponse(INDICES.GII, INDICATORS.SECONDARY_EDUCATION_M, INDICATORS.SECONDARY_EDUCATION_F);

// ============================================================================
// ECONOMIC INDICATORS
// ============================================================================

export const getGNIPerCapita = () => buildGenderHDROResponse(INDICES.HDI, INDICATORS.GNI_PER_CAPITA_M, INDICATORS.GNI_PER_CAPITA_F, INDICATORS.GNI_PER_CAPITA);
export const getLabourForce = () => buildGenderHDROResponse(INDICES.GII, INDICATORS.LABOUR_FORCE_M, INDICATORS.LABOUR_FORCE_F);

// ============================================================================
// HEALTH INDICATORS
// ============================================================================

export const getLifeExpectancy = () => buildGenderHDROResponse(INDICES.HDI, INDICATORS.LIFE_EXPECTANCY_M, INDICATORS.LIFE_EXPECTANCY_F, INDICATORS.LIFE_EXPECTANCY);
export const getMaternalMortality = () => buildHDROResponse(INDICES.GII, INDICATORS.MATERNAL_MORTALITY);
export const getAdolescentBirthRate = () => buildHDROResponse(INDICES.GII, INDICATORS.ADOLESCENT_BIRTH_RATE);

// ============================================================================
// ENVIRONMENTAL INDICATORS
// ============================================================================

export const getCO2Emissions = () => buildHDROResponse(INDICES.PHDI, INDICATORS.CO2_EMISSIONS);
export const getMaterialFootprint = () => buildHDROResponse(INDICES.PHDI, INDICATORS.MATERIAL_FOOTPRINT);

// ============================================================================
// LIVING STANDARDS
// ============================================================================

export const getElectricityAccess = () => buildHDROResponse(INDICES.MPI, INDICATORS.ELECTRICITY);
export const getWaterAccess = () => buildHDROResponse(INDICES.MPI, INDICATORS.DRINKING_WATER);
export const getSanitationAccess = () => buildHDROResponse(INDICES.MPI, INDICATORS.SANITATION);
export const getCookingFuelAccess = () => buildHDROResponse(INDICES.MPI, INDICATORS.COOKING_FUEL);
export const getHousingQuality = () => buildHDROResponse(INDICES.MPI, INDICATORS.HOUSING);

// ============================================================================
// GOVERNANCE & POVERTY
// ============================================================================

export const getParliamentRepresentation = () => buildGenderHDROResponse(INDICES.GII, INDICATORS.PARLIAMENT_SEATS_M, INDICATORS.PARLIAMENT_SEATS_F);
export const getMPI = () => buildHDROResponse(INDICES.MPI, INDICATORS.MPI);
