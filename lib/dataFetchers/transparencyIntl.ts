// Transparency International CPI Data Fetcher
import Papa from 'papaparse';

export interface CPIData {
    country: string;
    score: number;
    rank: number;
    totalCountries: number;
    year: number;
}

export async function fetchTransparencyCPI(): Promise<CPIData | null> {
    const csvUrl = 'https://images.transparencycdn.org/images/2023_CPI_dataset.csv';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error(`CPI fetch error: ${response.statusText}`);
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
                                row['Country / Territory']?.toLowerCase().includes('kenya')
                        );

                        if (!kenyaRow) {
                            console.warn('Kenya not found in CPI data');
                            resolve(null);
                            return;
                        }

                        // Extract CPI score and rank
                        const score =
                            parseFloat(kenyaRow['CPI score 2023'] || kenyaRow['CPI Score'] || kenyaRow['Score']) || 0;

                        const rank =
                            parseInt(kenyaRow['Rank'] || kenyaRow['CPI Rank'] || kenyaRow['Rank 2023']) || 0;

                        const totalCountries = data.filter((row) => row['CPI score 2023'] || row['Score']).length;

                        resolve({
                            country: 'Kenya',
                            score,
                            rank,
                            totalCountries,
                            year: 2023,
                        });
                    } catch (error) {
                        console.error('Error parsing CPI data:', error);
                        reject(error);
                    }
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error('Error fetching CPI:', error);
        return null;
    }
}
