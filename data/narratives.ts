// Narrative insights for storytelling on the homepage
// Highlights Kenya's biggest strengths and challenges

import { NarrativeInsight } from '@/types';

export const kenyaStrengths: NarrativeInsight[] = [
    {
        type: 'strength',
        title: 'Leading in Climate Action',
        description: 'Kenya demonstrates strong commitment to environmental sustainability with low CO2 emissions and significant renewable energy adoption.',
        indicatorId: 'sdg-13',
        value: '64%',
        rank: 'Top performer in East Africa',
        context: 'Kenya\'s investment in geothermal and renewable energy has positioned it as a regional leader in climate action. With 48.9% renewable energy share and low per capita emissions, the country is on track to meet its climate commitments.'
    },
    {
        type: 'strength',
        title: 'Quality Education Progress',
        description: 'Kenya has made significant strides in education with high primary completion rates and improving literacy.',
        indicatorId: 'sdg-4',
        value: '68%',
        rank: '87.3% primary completion',
        context: 'Free primary education policies have dramatically increased school enrollment and completion rates. Kenya\'s focus on education is creating a more skilled workforce and improving long-term development prospects.'
    },
    {
        type: 'strength',
        title: 'Economic Growth Momentum',
        description: 'Despite global challenges, Kenya maintains steady economic growth and rising GDP per capita.',
        indicatorId: 'gdp-per-capita-2023',
        value: '$2,099',
        rank: '158/195',
        context: 'Kenya\'s economy has shown resilience with a 5.3% GDP growth rate. The country\'s diversified economy, growing tech sector, and strategic location make it an economic hub for East Africa.'
    },
];

export const kenyaChallenges: NarrativeInsight[] = [
    {
        type: 'challenge',
        title: 'Corruption Remains a Major Concern',
        description: 'Kenya continues to struggle with high levels of perceived corruption in the public sector.',
        indicatorId: 'cpi-2023',
        value: '31/100',
        rank: '126/180',
        context: 'Corruption undermines economic development, erodes public trust, and diverts resources from essential services. Strengthening anti-corruption institutions and improving transparency are critical priorities for Kenya\'s development.'
    },
    {
        type: 'challenge',
        title: 'Persistent Poverty and Inequality',
        description: 'Over one-third of Kenyans still live below the poverty line, with significant regional disparities.',
        indicatorId: 'poverty-rate-2023',
        value: '36.1%',
        rank: '142/170',
        context: 'Despite economic growth, poverty reduction has been slow. Rural areas and certain regions face particularly high poverty rates. Addressing inequality and ensuring inclusive growth are essential for sustainable development.'
    },
    {
        type: 'challenge',
        title: 'Food Security and Nutrition Gaps',
        description: 'Kenya faces ongoing challenges with hunger and malnutrition, particularly in arid and semi-arid regions.',
        indicatorId: 'sdg-2',
        value: '48%',
        rank: 'Off-track',
        context: 'Climate variability, land degradation, and limited agricultural productivity contribute to food insecurity. Improving agricultural resilience and ensuring access to nutritious food are critical for achieving Zero Hunger.'
    },
];

// Overall narrative summary
export const kenyaNarrative = {
    title: 'Kenya\'s Story in Numbers',
    summary: 'Kenya stands at a crossroads of opportunity and challenge. As East Africa\'s economic hub, the country has made remarkable progress in education, climate action, and economic growth. However, persistent challenges in corruption, poverty, and food security require sustained attention and innovative solutions.',
    strengths: kenyaStrengths,
    challenges: kenyaChallenges,
    outlook: 'Kenya\'s young, dynamic population and strategic investments in technology, infrastructure, and renewable energy position it well for future growth. Success will depend on strengthening governance, reducing inequality, and ensuring that economic growth translates into improved living standards for all Kenyans.',
};
