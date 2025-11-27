import * as client from './client';
import * as utils from './utils';
import { WorldBankSearchOptions } from './types';

export async function searchWorldBankDocuments(query: string, options?: Partial<WorldBankSearchOptions>) {
  const response = await client.searchDocuments(query, options);
  return utils.normalizeDocuments(response);
}

export async function getKenyaDocuments(options?: Partial<WorldBankSearchOptions>) {
  const response = await client.getDocumentsByCountry('Kenya', options);
  return utils.normalizeDocuments(response);
}

export async function getDocumentsByCountry(country: string, options?: Partial<WorldBankSearchOptions>) {
  const response = await client.getDocumentsByCountry(country, options);
  return utils.normalizeDocuments(response);
}
