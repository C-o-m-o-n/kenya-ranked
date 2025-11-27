import { fetchWhoIndicatorData, fetchWhoIndicators } from '../lib/dataFetchers/who/client';
import { getWhoIndicatorAsStandard } from '../lib/dataFetchers/who/adapter';

async function testWhoIntegration() {
    console.log('🧪 Testing WHO API Integration...');

    try {
        // 1. Test fetching all indicators (limit to 5 for brevity)
        console.log('\n1. Fetching available indicators...');
        const indicators = await fetchWhoIndicators();
        console.log(`✅ Found ${indicators.length} indicators.`);
        if (indicators.length > 0) {
            console.log('Sample indicators:', indicators.slice(0, 3).map(i => `${i.IndicatorCode}: ${i.IndicatorName}`));
        }

        // 2. Test fetching specific indicator (Life Expectancy: WHOSIS_000001)
        console.log('\n2. Fetching Life Expectancy (WHOSIS_000001) for Kenya...');
        const data = await fetchWhoIndicatorData('WHOSIS_000001');
        console.log(`✅ Found ${data.length} data points.`);
        if (data.length > 0) {
            console.log('Latest data point:', data[0]);
        } else {
            console.warn('⚠️ No data found for WHOSIS_000001');
        }

        // 3. Test Adapter
        console.log('\n3. Testing Adapter transformation...');
        const adapted = await getWhoIndicatorAsStandard('WHOSIS_000001');
        if (adapted) {
            console.log('✅ Adapter success:', adapted);
        } else {
            console.error('❌ Adapter returned null');
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testWhoIntegration();
