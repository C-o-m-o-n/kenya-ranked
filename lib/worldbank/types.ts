export interface WorldBankDocument {
  id: string;
  display_title: string;
  abstracts?: {
    'cdata!': string;
  };
  docdt: string; // Document date
  count: string; // Country
  url: string;
  pdfurl?: string;
  guid: string;
  entityids?: {
    entityid: string;
  };
  docty?: string; // Document Type
  topic?: string; // Topics
  authr?: string; // Authors
  majtheme?: string; // Major Theme
  // Add other fields as needed based on the API response
}

export interface WorldBankResponse {
  rows: number;
  os: number; // Offset
  page: number;
  total: number;
  documents: Record<string, WorldBankDocument>;
}

export interface WorldBankSearchOptions {
  qterm?: string;
  fl?: string; // Fields to return
  format?: 'json' | 'xml';
  rows?: number;
  os?: number; // Offset
  [key: string]: any; // Allow other parameters like country_exact, etc.
}
