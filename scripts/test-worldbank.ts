import { getKenyaDocuments, searchWorldBankDocuments } from '../lib/worldbank/services';
import { getAbstract } from '../lib/worldbank/utils';

async function main() {
  console.log('--- Testing World Bank API ---');

  try {
    console.log('\n1. Fetching documents for Kenya...');
    const kenyaDocs = await getKenyaDocuments({ rows: 3 });
    console.log(`Found ${kenyaDocs.length} documents for Kenya.`);
    
    kenyaDocs.forEach(doc => {
      console.log(`- [${doc.docdt}] ${doc.display_title}`);
      console.log(`  Abstract: ${getAbstract(doc).substring(0, 100)}...`);
    });

    console.log('\n2. Searching for "Wind Turbine"...');
    const searchDocs = await searchWorldBankDocuments('wind turbine', { rows: 3 });
    console.log(`Found ${searchDocs.length} documents for "wind turbine".`);
    
    searchDocs.forEach((doc, index) => {
      if (!doc.id) {
        console.log(`[WARN] Document at index ${index} has no ID:`, JSON.stringify(doc));
      } else {
        console.log(`- [${doc.docdt}] ${doc.display_title} (${doc.count})`);
      }
    });

  } catch (error) {
    console.error('Error testing World Bank API:', error);
  }
}

main();
