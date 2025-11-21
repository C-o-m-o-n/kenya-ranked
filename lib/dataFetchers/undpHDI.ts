// UNDP HDI Data Fetcher
import Papa from 'papaparse';

export interface HDIData {
    country: string;
    hdiValue: number;
    hdiRank: number;
    totalCountries: number;
    year: number;
}

export async function fetchUNDPHDI(): Promise<HDIData | null> {
    const csvUrl = 'https://hdr.undp.org/sites/default/files/2024-01/Statistical_Annex_Table_1.csv';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error(`UNDP HDI fetch error: ${response.statusText}`);
        }

        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    try {
                        const data = results.data as any[];

                        // Find Kenya in the data
                        const kenyaRow = data.find(
                            (row) =>
                                row.Country?.toLowerCase().includes('kenya') ||
                                row['Country name']?.toLowerCase().includes('kenya')
                        );

                        if (!kenyaRow) {
                            console.warn('Kenya not found in UNDP HDI data');
                            resolve(null);
                            return;
                        }

                        // Extract HDI value and rank
                        // Column names may vary, so we check multiple possibilities
                        const hdiValue =
                            parseFloat(kenyaRow['HDI value'] || kenyaRow['Human Development Index'] || kenyaRow['HDI']) || 0;

                        const hdiRank =
                            parseInt(kenyaRow['HDI rank'] || kenyaRow['Rank'] || kenyaRow['HDI Rank']) || 0;

                        const totalCountries = data.filter((row) => row['HDI value'] || row['HDI']).length;

                        resolve({
                            country: 'Kenya',
                            hdiValue,
                            hdiRank,
                            totalCountries,
                            year: 2023, // Update this based on the latest data year
                        });
                    } catch (error) {
                        console.error('Error parsing UNDP HDI data:', error);
                        reject(error);
                    }
                },
                error: (error: Error) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error('Error fetching UNDP HDI:', error);
        return null;
    }
}
