// Database Seeding Script - Populate MongoDB with real data
import connectDB from '../lib/mongodb';
import { Indicator } from '../models/Indicator.model';
import { SDGGoal } from '../models/SDGGoal.model';
import {
    fetchWorldBankIndicator,
    fetchRegionalComparison,
    WORLD_BANK_INDICATORS,
} from '../lib/dataFetchers/worldBank';
import { fetchUNDPHDI } from '../lib/dataFetchers/undpHDI';
import { fetchTransparencyCPI } from '../lib/dataFetchers/transparencyIntl';
import { fetchSDGIndex } from '../lib/dataFetchers/sdgIndex';
import { fetchPressFreedom } from '../lib/dataFetchers/pressFreedom';
import { getTrendDirection } from '../lib/utils';

// SDG Goal metadata
const SDG_GOALS_METADATA = [
    { number: 1, title: 'No Poverty', slug: 'no-poverty', description: 'End poverty in all its forms everywhere', color: '#E5243B', icon: '🏚️' },
    { number: 2, title: 'Zero Hunger', slug: 'zero-hunger', description: 'End hunger, achieve food security', color: '#DDA63A', icon: '🌾' },
    { number: 3, title: 'Good Health and Well-being', slug: 'good-health', description: 'Ensure healthy lives', color: '#4C9F38', icon: '🏥' },
    { number: 4, title: 'Quality Education', slug: 'quality-education', description: 'Ensure inclusive education', color: '#C5192D', icon: '📚' },
    { number: 5, title: 'Gender Equality', slug: 'gender-equality', description: 'Achieve gender equality', color: '#FF3A21', icon: '⚖️' },
    { number: 6, title: 'Clean Water and Sanitation', slug: 'clean-water', description: 'Ensure water availability', color: '#26BDE2', icon: '💧' },
    { number: 7, title: 'Affordable and Clean Energy', slug: 'clean-energy', description: 'Ensure access to energy', color: '#FCC30B', icon: '⚡' },
    { number: 8, title: 'Decent Work and Economic Growth', slug: 'economic-growth', description: 'Promote economic growth', color: '#A21942', icon: '💼' },
    { number: 9, title: 'Industry, Innovation and Infrastructure', slug: 'innovation-infrastructure', description: 'Build resilient infrastructure', color: '#FD6925', icon: '🏗️' },
    { number: 10, title: 'Reduced Inequalities', slug: 'reduced-inequalities', description: 'Reduce inequality', color: '#DD1367', icon: '📊' },
    { number: 11, title: 'Sustainable Cities and Communities', slug: 'sustainable-cities', description: 'Make cities sustainable', color: '#FD9D24', icon: '🏙️' },
    { number: 12, title: 'Responsible Consumption and Production', slug: 'responsible-consumption', description: 'Ensure sustainable consumption', color: '#BF8B2E', icon: '♻️' },
    { number: 13, title: 'Climate Action', slug: 'climate-action', description: 'Combat climate change', color: '#3F7E44', icon: '🌍' },
    { number: 14, title: 'Life Below Water', slug: 'life-below-water', description: 'Conserve marine resources', color: '#0A97D9', icon: '🐠' },
    { number: 15, title: 'Life on Land', slug: 'life-on-land', description: 'Protect ecosystems', color: '#56C02B', icon: '🌳' },
    { number: 16, title: 'Peace, Justice and Strong Institutions', slug: 'peace-justice', description: 'Promote peaceful societies', color: '#00689D', icon: '⚖️' },
    { number: 17, title: 'Partnerships for the Goals', slug: 'partnerships', description: 'Strengthen implementation', color: '#19486A', icon: '🤝' },
];

async function seedWorldBankIndicators() {
    console.log('\n📊 Fetching World Bank indicators...');

    for (const indicator of WORLD_BANK_INDICATORS) {
        try {
            console.log(`  Fetching: ${indicator.name}...`);

            const data = await fetchWorldBankIndicator(indicator.code);
            if (data.length === 0) {
                console.log(`    ⚠️  No data found`);
                continue;
            }

            // Get latest value
            const latest = data[0];
            const score = latest.value || 0;
            const year = parseInt(latest.date);

            // Get trend data (last 10 years)
            const trendData = data
                .slice(0, 10)
                .reverse()
                .map((d) => ({
                    year: parseInt(d.date),
                    value: d.value || 0,
                }));

            // Calculate trend
            const previousValue = data[1]?.value || score;
            const trend = getTrendDirection(score, previousValue, indicator.higherIsBetter);

            // Get regional comparisons
            const regionalComparisons = await fetchRegionalComparison(indicator.code);

            // Create slug
            const slug = indicator.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Upsert indicator
            await Indicator.findOneAndUpdate(
                { slug },
                {
                    id: `wb-${indicator.code}`,
                    name: indicator.name,
                    slug,
                    category: indicator.category,
                    description: indicator.description,
                    year,
                    score,
                    rank: 0, // World Bank doesn't provide ranks
                    totalCountries: 0,
                    trend,
                    trendData,
                    regionalComparisons,
                    source: 'World Bank',
                    sourceUrl: `https://data.worldbank.org/indicator/${indicator.code}`,
                    methodology: 'World Bank World Development Indicators and Worldwide Governance Indicators',
                    unit: indicator.unit,
                    higherIsBetter: indicator.higherIsBetter,
                    lastUpdated: new Date(),
                },
                { upsert: true, new: true }
            );

            console.log(`    ✅ Saved: ${indicator.name}`);
        } catch (error) {
            console.error(`    ❌ Error fetching ${indicator.name}:`, error);
        }
    }
}

async function seedHDI() {
    console.log('\n📊 Fetching UNDP HDI...');

    try {
        const data = await fetchUNDPHDI();
        if (!data) {
            console.log('  ⚠️  No HDI data found');
            return;
        }

        await Indicator.findOneAndUpdate(
            { slug: 'human-development-index' },
            {
                id: 'undp-hdi',
                name: 'Human Development Index',
                slug: 'human-development-index',
                category: 'development',
                description: 'Composite index measuring average achievement in three basic dimensions of human development.',
                year: data.year,
                score: data.hdiValue,
                rank: data.hdiRank,
                totalCountries: data.totalCountries,
                trend: 'neutral',
                trendData: [],
                regionalComparisons: [],
                source: 'UNDP - Human Development Report',
                sourceUrl: 'https://hdr.undp.org/',
                methodology: 'The HDI is a summary measure of average achievement in key dimensions of human development.',
                unit: 'Index (0-1)',
                higherIsBetter: true,
                lastUpdated: new Date(),
            },
            { upsert: true, new: true }
        );

        console.log('  ✅ Saved: Human Development Index');
    } catch (error) {
        console.error('  ❌ Error fetching HDI:', error);
    }
}

async function seedCPI() {
    console.log('\n📊 Fetching Corruption Perceptions Index...');

    try {
        const data = await fetchTransparencyCPI();
        if (!data) {
            console.log('  ⚠️  No CPI data found');
            return;
        }

        await Indicator.findOneAndUpdate(
            { slug: 'corruption-perceptions-index' },
            {
                id: 'ti-cpi',
                name: 'Corruption Perceptions Index',
                slug: 'corruption-perceptions-index',
                category: 'corruption',
                description: 'Measures perceived levels of public sector corruption according to experts and business people.',
                year: data.year,
                score: data.score,
                rank: data.rank,
                totalCountries: data.totalCountries,
                trend: 'neutral',
                trendData: [],
                regionalComparisons: [],
                source: 'Transparency International',
                sourceUrl: 'https://www.transparency.org/en/cpi/2023',
                methodology: 'The CPI scores and ranks countries based on how corrupt a country\'s public sector is perceived to be.',
                unit: 'Score (0-100)',
                higherIsBetter: true,
                lastUpdated: new Date(),
            },
            { upsert: true, new: true }
        );

        console.log('  ✅ Saved: Corruption Perceptions Index');
    } catch (error) {
        console.error('  ❌ Error fetching CPI:', error);
    }
}

async function seedSDGGoals() {
    console.log('\n📊 Fetching SDG Index...');

    try {
        const data = await fetchSDGIndex();
        if (!data) {
            console.log('  ⚠️  No SDG data found');
            return;
        }

        // Save overall SDG score as an indicator
        await Indicator.findOneAndUpdate(
            { slug: 'sdg-index-score' },
            {
                id: 'sdg-index',
                name: 'SDG Index Score',
                slug: 'sdg-index-score',
                category: 'sdg',
                description: 'Overall performance on the 17 Sustainable Development Goals.',
                year: data.year,
                score: data.overallScore,
                rank: data.rank,
                totalCountries: data.totalCountries,
                trend: 'neutral',
                trendData: [],
                regionalComparisons: [],
                source: 'Sustainable Development Report',
                sourceUrl: 'https://dashboards.sdgindex.org/',
                methodology: 'The SDG Index score can be interpreted as a percentage of SDG achievement.',
                unit: 'Score (0-100)',
                higherIsBetter: true,
                lastUpdated: new Date(),
            },
            { upsert: true, new: true }
        );

        // Save individual SDG goals
        for (const goalMeta of SDG_GOALS_METADATA) {
            const goalData = data.goals.find((g) => g.goalNumber === goalMeta.number);
            const score = goalData?.score || 50;

            // Determine status based on score
            let status: 'on-track' | 'moderate' | 'off-track' | 'insufficient-data';
            if (score >= 70) status = 'on-track';
            else if (score >= 50) status = 'moderate';
            else status = 'off-track';

            await SDGGoal.findOneAndUpdate(
                { number: goalMeta.number },
                {
                    ...goalMeta,
                    progress: score,
                    status,
                    indicators: [], // Will be populated with more detailed data later
                    lastUpdated: new Date(),
                },
                { upsert: true, new: true }
            );

            console.log(`  ✅ Saved: SDG ${goalMeta.number} - ${goalMeta.title}`);
        }
    } catch (error) {
        console.error('  ❌ Error fetching SDG data:', error);
    }
}

async function seedPressFreedom() {
    console.log('\n📊 Fetching Press Freedom Index...');

    try {
        const data = await fetchPressFreedom();
        if (!data) {
            console.log('  ⚠️  No Press Freedom data found');
            return;
        }

        await Indicator.findOneAndUpdate(
            { slug: 'press-freedom-index' },
            {
                id: 'rsf-pfi',
                name: 'Press Freedom Index',
                slug: 'press-freedom-index',
                category: 'governance',
                description: 'Measures the level of freedom available to journalists.',
                year: data.year,
                score: data.score,
                rank: data.rank,
                totalCountries: data.totalCountries,
                trend: 'neutral',
                trendData: [],
                regionalComparisons: [],
                source: 'Reporters Without Borders',
                sourceUrl: 'https://rsf.org/en/index',
                methodology: 'The index evaluates the state of journalism in 180 countries.',
                unit: 'Score (0-100)',
                higherIsBetter: false, // Lower score is better for press freedom
                lastUpdated: new Date(),
            },
            { upsert: true, new: true }
        );

        console.log('  ✅ Saved: Press Freedom Index');
    } catch (error) {
        console.error('  ❌ Error fetching Press Freedom:', error);
    }
}

async function main() {
    console.log('🚀 Starting database seeding...\n');

    try {
        await connectDB();
        console.log('✅ Connected to MongoDB\n');

        await seedWorldBankIndicators();
        await seedHDI();
        await seedCPI();
        await seedSDGGoals();
        await seedPressFreedom();

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding database:', error);
        process.exit(1);
    }
}

main();
