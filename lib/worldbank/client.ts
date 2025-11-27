import { WorldBankResponse, WorldBankSearchOptions } from './types';

const API_BASE = 'https://search.worldbank.org/api/v3/wds';

/**
 * Generic fetch function for World Bank API
 */
export async function fetchWorldBankData(options: WorldBankSearchOptions): Promise<WorldBankResponse> {
  const params = new URLSearchParams();
  
  // Set default format to json
  params.append('format', 'json');
  
  // Add all options to params
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const url = `${API_BASE}?${params.toString()}`;
  console.log(`[WorldBank Client] Fetching: ${url}`);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data from World Bank API: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Search for documents
 */
export async function searchDocuments(query: string, options: Partial<WorldBankSearchOptions> = {}): Promise<WorldBankResponse> {
  return fetchWorldBankData({
    qterm: query,
    fl: 'id,display_title,abstracts,docdt,count,url,pdfurl,guid,entityids,docty,topic,authr,majtheme', // Default fields
    ...options,
  });
}

/**
 * Get documents by country (defaults to Kenya)
 */
export async function getDocumentsByCountry(country: string = 'Kenya', options: Partial<WorldBankSearchOptions> = {}): Promise<WorldBankResponse> {
  // Using qterm for country search as per simple example, but could also use count_exact if needed.
  // The docs say "count_exact" is for specific country field match.
  // Let's try to be specific if possible, but qterm is safer for general search.
  // Based on docs: https://search.worldbank.org/api/v3/wds?format=json&count_exact=Kenya
  
  return fetchWorldBankData({
    count_exact: country,
    fl: 'id,display_title,abstracts,docdt,count,url,pdfurl,guid,entityids,docty,topic,authr,majtheme',
    ...options,
  });
}
