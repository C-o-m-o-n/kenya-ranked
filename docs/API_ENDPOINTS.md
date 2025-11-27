# HDRO API Endpoints Documentation

This document provides an overview of all available HDRO (Human Development Report Office) API endpoints for Kenya development indicators.

## Base URL

All endpoints are available at: `http://localhost:3000/api/`

## Response Format

All endpoints return data in the following format:

```typescript
{
  kenya: {
    current: { year: number, value: number },
    history: Array<{ year: number, value: number }>
  },
  comparison: Array<{ country: string, value: number }>
}
```

For gender-disaggregated endpoints:

```typescript
{
  kenya: {
    current: { year: number, male: number, female: number, total?: number },
    history: Array<{ year: number, male: number, female: number, total?: number }>
  },
  comparison: Array<{ country: string, value: number }>
}
```

## Available Endpoints

### Core Development Indices

#### 1. HDI - Human Development Index

- **Endpoint**: `/api/hdi`
- **Description**: Composite index measuring average achievement in health, education, and income
- **Range**: 0 to 1 (higher is better)

#### 2. IHDI - Inequality-adjusted HDI

- **Endpoint**: `/api/ihdi`
- **Description**: HDI adjusted for inequality in the distribution of achievements
- **Range**: 0 to 1 (higher is better)

#### 3. PHDI - Planetary Pressures-adjusted HDI

- **Endpoint**: `/api/phdi`
- **Description**: HDI adjusted for planetary pressures (CO2 emissions and material footprint)
- **Range**: 0 to 1 (higher is better)

---

### Gender Equality Metrics

#### 4. GDI - Gender Development Index

- **Endpoint**: `/api/gdi`
- **Description**: Measures gender gaps in human development achievements
- **Range**: 0 to 1 (closer to 1 indicates greater gender parity)

#### 5. GII - Gender Inequality Index

- **Endpoint**: `/api/gii`
- **Description**: Measures gender-based disadvantage in reproductive health, empowerment, and labor market
- **Range**: 0 to 1 (lower is better)

---

### Education Indicators

#### 6. Mean Years of Schooling

- **Endpoint**: `/api/education/mean-years-schooling`
- **Description**: Average years of education received by people ages 25 and older
- **Gender-disaggregated**: Yes
- **Unit**: Years

#### 7. Expected Years of Schooling

- **Endpoint**: `/api/education/expected-years-schooling`
- **Description**: Number of years of schooling a child is expected to receive
- **Gender-disaggregated**: Yes
- **Unit**: Years

#### 8. Secondary Education Rate

- **Endpoint**: `/api/education/secondary-education`
- **Description**: Percentage of population (25+) with at least some secondary education
- **Gender-disaggregated**: Yes
- **Unit**: Percentage

---

### Economic Indicators

#### 9. GNI Per Capita

- **Endpoint**: `/api/economic/gni-per-capita`
- **Description**: Gross National Income per person in 2021 PPP dollars
- **Gender-disaggregated**: Yes
- **Unit**: 2021 PPP$

#### 10. Labour Force Participation

- **Endpoint**: `/api/economic/labour-force`
- **Description**: Percentage of population (15+) participating in the labor force
- **Gender-disaggregated**: Yes
- **Unit**: Percentage

---

### Health Indicators

#### 11. Life Expectancy

- **Endpoint**: `/api/health/life-expectancy`
- **Description**: Expected number of years a newborn would live under current mortality patterns
- **Gender-disaggregated**: Yes
- **Unit**: Years

#### 12. Maternal Mortality Ratio

- **Endpoint**: `/api/health/maternal-mortality`
- **Description**: Number of maternal deaths per 100,000 live births
- **Unit**: Deaths per 100,000 live births
- **Note**: Lower is better

#### 13. Adolescent Birth Rate

- **Endpoint**: `/api/health/adolescent-birth-rate`
- **Description**: Number of births per 1,000 women ages 15-19
- **Unit**: Births per 1,000 women
- **Note**: Lower is better

---

### Environmental Indicators

#### 14. CO2 Emissions Per Capita

- **Endpoint**: `/api/environment/co2-emissions`
- **Description**: Carbon dioxide emissions per person (production-based)
- **Unit**: Tonnes per capita
- **Note**: Lower is better for sustainability

#### 15. Material Footprint Per Capita

- **Endpoint**: `/api/environment/material-footprint`
- **Description**: Total amount of raw materials extracted to meet consumption needs
- **Unit**: Tonnes per capita
- **Note**: Lower is better for sustainability

---

### Living Standards

#### 16. Access to Electricity

- **Endpoint**: `/api/living-standards/electricity`
- **Description**: Percentage of population with access to electricity
- **Unit**: Percentage

#### 17. Access to Clean Drinking Water

- **Endpoint**: `/api/living-standards/water`
- **Description**: Percentage of population with access to improved drinking water sources
- **Unit**: Percentage

#### 18. Access to Sanitation

- **Endpoint**: `/api/living-standards/sanitation`
- **Description**: Percentage of population with access to improved sanitation facilities
- **Unit**: Percentage

#### 19. Clean Cooking Fuel

- **Endpoint**: `/api/living-standards/cooking-fuel`
- **Description**: Percentage of population using clean cooking fuels and technologies
- **Unit**: Percentage

#### 20. Housing Quality

- **Endpoint**: `/api/living-standards/housing`
- **Description**: Percentage of population with adequate housing
- **Unit**: Percentage

---

### Governance & Poverty

#### 21. Parliamentary Representation

- **Endpoint**: `/api/governance/parliament`
- **Description**: Share of seats in parliament by gender
- **Gender-disaggregated**: Yes
- **Unit**: Percentage

#### 22. MPI - Multidimensional Poverty Index

- **Endpoint**: `/api/poverty/mpi`
- **Description**: Measures acute multidimensional poverty across health, education, and living standards
- **Range**: 0 to 1 (lower is better)

---

## Regional Comparisons

All endpoints include comparisons with:

- **Kenya** (primary country)
- **Rwanda**
- **Tanzania**
- **Uganda**
- **Ethiopia**
- **Somalia**
- **East Africa Average**
- **Africa Average**
- **World Average**

## Data Caching

All endpoints use Next.js caching with a revalidation period of 3600 seconds (1 hour).

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

HTTP Status Codes:

- `200`: Success
- `500`: Server error (API failure, data not found, etc.)

## Example Usage

### Fetch HDI Data

```typescript
const response = await fetch("/api/hdi");
const data = await response.json();

console.log(
  `Kenya's current HDI: ${data.kenya.current.value} (${data.kenya.current.year})`
);
console.log(`Historical data points: ${data.kenya.history.length}`);
console.log(`Comparison countries: ${data.comparison.length}`);
```

### Fetch Gender-Disaggregated Data

```typescript
const response = await fetch("/api/education/mean-years-schooling");
const data = await response.json();

const current = data.kenya.current;
console.log(`Male: ${current.male} years`);
console.log(`Female: ${current.female} years`);
console.log(`Total: ${current.total} years`);
```

## Data Source

All data is sourced from the UNDP Human Development Report Office (HDRO) API:

- **Base URL**: https://hdrdata.org/api/CompositeIndices
- **Documentation**: https://hdr.undp.org/data-center

## Notes

- Historical data availability varies by indicator (typically 1990-2023)
- Some indicators may have missing data for certain years
- Regional averages are approximations and should be updated periodically
- Gender-disaggregated data may not be available for all years/indicators
