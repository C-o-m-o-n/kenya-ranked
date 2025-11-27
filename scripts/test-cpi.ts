import { getTransparencyIndicatorAsStandard } from '../lib/dataFetchers/transparencyIntl';

async function main() {
  console.log('Testing CPI data fetcher...');
  
  try {
    const cpi = await getTransparencyIndicatorAsStandard();
    console.log('CPI data:', JSON.stringify(cpi, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
