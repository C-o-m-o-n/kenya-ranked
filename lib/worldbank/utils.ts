import { WorldBankDocument, WorldBankResponse } from './types';

/**
 * The World Bank API returns documents as an object keyed by ID.
 * This helper converts that object into an array of documents.
 */
export function normalizeDocuments(response: WorldBankResponse): WorldBankDocument[] {
  if (!response || !response.documents) {
    return [];
  }
  return Object.values(response.documents).filter(doc => doc && doc.id);
}

/**
 * Extract the abstract text from the weird cdata structure if present
 */
export function getAbstract(doc: WorldBankDocument): string {
  if (doc.abstracts && doc.abstracts['cdata!']) {
    return doc.abstracts['cdata!'];
  }
  return '';
}
