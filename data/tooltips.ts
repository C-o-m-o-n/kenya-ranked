// Tooltip content for all indicators and metrics
// Brief explanations to help users understand what each metric means

import { InfoContent } from '@/types';

export const indicatorTooltips: Record<string, InfoContent> = {
    'cpi-2023': {
        title: 'Corruption Perceptions Index',
        brief: 'Measures how corrupt a country\'s public sector is perceived to be by experts and business people.',
        detailed: 'The Corruption Perceptions Index (CPI) ranks countries and territories by their perceived levels of public sector corruption, according to experts and business people. The index uses a scale of 0 (highly corrupt) to 100 (very clean). It is based on 13 different data sources from 12 different institutions.',
        whyItMatters: 'Corruption undermines economic development, weakens democracy, and erodes public trust in government institutions. Lower corruption levels are associated with better governance, stronger institutions, and improved quality of life.',
        methodology: 'The CPI is a composite index combining 13 surveys and assessments of corruption from various reputable institutions. Each data source scores countries on a scale from 0-100, and these scores are standardized and averaged to produce the final CPI score.',
        sourceUrl: 'https://www.transparency.org/en/cpi/2023'
    },
    'wgi-control-corruption-2022': {
        title: 'Control of Corruption (WGI)',
        brief: 'Reflects perceptions of the extent to which public power is exercised for private gain.',
        detailed: 'This indicator from the World Bank\'s Worldwide Governance Indicators captures perceptions of the extent to which public power is exercised for private gain, including both petty and grand forms of corruption, as well as "capture" of the state by elites and private interests. Scores range from -2.5 (weak) to 2.5 (strong).',
        whyItMatters: 'Effective control of corruption is essential for economic growth, social stability, and public trust. Countries with better control of corruption tend to have more efficient public services, stronger rule of law, and better development outcomes.',
        methodology: 'The indicator is based on hundreds of individual variables from over 30 data sources, including surveys of households and firms, as well as assessments by commercial risk rating agencies, think tanks, and international organizations.',
        sourceUrl: 'https://www.worldbank.org/en/publication/worldwide-governance-indicators'
    },
    'hdi-2022': {
        title: 'Human Development Index',
        brief: 'Measures average achievement in three key dimensions: health, education, and standard of living.',
        detailed: 'The Human Development Index (HDI) is a summary measure of average achievement in key dimensions of human development: a long and healthy life (measured by life expectancy), being knowledgeable (measured by years of schooling), and having a decent standard of living (measured by GNI per capita). The index ranges from 0 to 1, with higher values indicating better human development.',
        whyItMatters: 'The HDI provides a more comprehensive view of development than economic indicators alone. It emphasizes that people and their capabilities should be the ultimate criteria for assessing a country\'s development, not just economic growth.',
        methodology: 'The HDI is calculated using geometric mean of normalized indices for each of the three dimensions: health (life expectancy at birth), education (mean years of schooling and expected years of schooling), and standard of living (GNI per capita in PPP terms).',
        sourceUrl: 'https://hdr.undp.org/'
    },
    'gdp-per-capita-2023': {
        title: 'GDP Per Capita',
        brief: 'The total economic output of a country divided by its population.',
        detailed: 'GDP per capita is gross domestic product divided by midyear population. GDP is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in current U.S. dollars.',
        whyItMatters: 'GDP per capita is a key indicator of economic prosperity and living standards. While it doesn\'t capture inequality or quality of life, it provides a useful measure of average economic output per person and allows for comparisons across countries.',
        methodology: 'GDP is calculated using the expenditure approach (consumption + investment + government spending + net exports) or the production approach (sum of value added). The total is then divided by the midyear population estimate.',
        sourceUrl: 'https://data.worldbank.org/'
    },
    'poverty-rate-2023': {
        title: 'Poverty Headcount Ratio',
        brief: 'The percentage of the population living below the national poverty line.',
        detailed: 'The poverty headcount ratio is the percentage of the population living below the national poverty line. National estimates are based on population-weighted subgroup estimates from household surveys. The poverty line is defined as the minimum level of income deemed adequate in a particular country.',
        whyItMatters: 'Poverty reduction is a fundamental development goal. High poverty rates indicate that a significant portion of the population lacks access to basic necessities, which affects health, education, and overall quality of life.',
        methodology: 'Poverty rates are calculated from household survey data, where household income or consumption is compared to the national poverty line. The poverty line is typically set based on the cost of a minimum basket of goods and services needed for basic living.',
        sourceUrl: 'https://pip.worldbank.org/'
    },
    'sdg-index-2023': {
        title: 'SDG Index Score',
        brief: 'Measures overall progress toward achieving all 17 Sustainable Development Goals.',
        detailed: 'The SDG Index assesses countries\' overall performance on the 17 Sustainable Development Goals. The score can be interpreted as a percentage of SDG achievement, with 100 indicating that all SDGs have been achieved. The index is calculated as the average of scores across all 17 goals, each of which is based on multiple indicators.',
        whyItMatters: 'The SDGs represent a universal call to action to end poverty, protect the planet, and ensure prosperity for all by 2030. The SDG Index helps track progress and identify areas where more effort is needed.',
        methodology: 'The index aggregates performance across indicators for each of the 17 SDGs. Indicators are normalized to a 0-100 scale, with 100 representing SDG achievement. The overall score is the arithmetic mean of the 17 goal scores.',
        sourceUrl: 'https://dashboards.sdgindex.org/'
    },
};

// SDG Goal tooltips
export const sdgTooltips: Record<number, InfoContent> = {
    1: {
        title: 'No Poverty',
        brief: 'End poverty in all its forms everywhere by 2030.',
        detailed: 'SDG 1 aims to eradicate extreme poverty for all people everywhere, currently measured as people living on less than $2.15 a day. It also seeks to reduce by half the proportion of people living in poverty according to national definitions and ensure that all people have equal rights to economic resources and access to basic services.',
        whyItMatters: 'Poverty is more than just a lack of income. It manifests in hunger, malnutrition, limited access to education and basic services, social discrimination, and exclusion. Ending poverty is essential for sustainable development and human dignity.',
    },
    2: {
        title: 'Zero Hunger',
        brief: 'End hunger, achieve food security, and promote sustainable agriculture.',
        detailed: 'SDG 2 seeks to end hunger and all forms of malnutrition by 2030. It also commits to universal access to safe, nutritious, and sufficient food year-round, doubling agricultural productivity and incomes of small-scale food producers, and ensuring sustainable food production systems.',
        whyItMatters: 'Hunger and malnutrition are major obstacles to development. They affect physical and cognitive development, reduce productivity, and perpetuate poverty. Food security is fundamental to human well-being and economic growth.',
    },
    3: {
        title: 'Good Health and Well-being',
        brief: 'Ensure healthy lives and promote well-being for all at all ages.',
        detailed: 'SDG 3 aims to ensure healthy lives and promote well-being for all at all ages. This includes reducing maternal and child mortality, ending epidemics of major diseases, achieving universal health coverage, and ensuring access to safe and effective medicines and vaccines.',
        whyItMatters: 'Good health is essential for sustainable development. Healthy populations are more productive, children learn better, and communities are more resilient. Universal health coverage ensures that everyone can access quality health services without financial hardship.',
    },
    4: {
        title: 'Quality Education',
        brief: 'Ensure inclusive and equitable quality education for all.',
        detailed: 'SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. This includes free primary and secondary education, equal access to vocational training, elimination of gender disparities, and universal literacy and numeracy.',
        whyItMatters: 'Education is a fundamental human right and essential for achieving sustainable development. It empowers people, reduces poverty and inequality, improves health outcomes, and promotes peace and tolerance.',
    },
    5: {
        title: 'Gender Equality',
        brief: 'Achieve gender equality and empower all women and girls.',
        detailed: 'SDG 5 aims to achieve gender equality and empower all women and girls. This includes ending all forms of discrimination and violence against women and girls, ensuring equal participation in leadership and decision-making, and ensuring universal access to sexual and reproductive health.',
        whyItMatters: 'Gender equality is not only a fundamental human right but also essential for peaceful, prosperous, and sustainable societies. Empowering women and girls has multiplier effects on productivity, economic growth, and development outcomes.',
    },
    // Add more SDG tooltips as needed...
};

// General UI tooltips
export const uiTooltips = {
    lastUpdated: {
        title: 'Last Updated',
        brief: 'The date when this data was last refreshed from the source.',
        detailed: 'This timestamp indicates when the data was last updated in our system. Data freshness varies by indicator depending on the publication schedule of the source organization.',
        whyItMatters: 'Knowing when data was last updated helps you assess its relevance and reliability. More recent data generally provides a more accurate picture of current conditions.',
    },
    dataFreshness: {
        title: 'Data Freshness',
        brief: 'Indicates how recent the data is.',
        detailed: 'Data freshness is categorized as: Fresh (updated within 30 days), Recent (updated within 6 months), or Needs Update (older than 6 months). Different indicators have different update frequencies based on their source.',
        whyItMatters: 'Fresh data provides the most accurate and relevant insights. However, some important indicators are only updated annually or less frequently by their source organizations.',
    },
    trend: {
        title: 'Trend',
        brief: 'Shows whether the indicator is improving, declining, or stable over time.',
        detailed: 'The trend is determined by comparing recent values to historical data. An upward trend may be positive or negative depending on the indicator (e.g., rising GDP is good, but rising poverty is bad).',
        whyItMatters: 'Trends help identify progress or deterioration over time, which is essential for understanding whether policies and interventions are working.',
    },
};
