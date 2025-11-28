

const WHO_API_BASE = 'https://ghoapi.azureedge.net/api';

export interface WhoIndicator {
    IndicatorCode: string;
    IndicatorName: string;
    Language: string;
}

export interface WhoDimension {
    Code: string;
    Title: string;
}

export interface WhoDataPoint {
    Id: number;
    IndicatorCode: string;
    SpatialDimType: string;
    SpatialDim: string;
    TimeDimType: string;
    TimeDim: number;
    Dim1Type: string | null;
    Dim1: string | null;
    Dim2Type: string | null;
    Dim2: string | null;
    Dim3Type: string | null;
    Dim3: string | null;
    DataSourceDimType: string | null;
    DataSourceDim: string | null;
    Value: string;
    NumericValue: number | null;
    Low: number | null;
    High: number | null;
    Comments: string | null;
    Date: string;
    TimeDimensionValue: string;
    TimeDimensionBegin: string;
    TimeDimensionEnd: string;
}

/**
 * Fetch list of all available indicators
 */
export const fetchWhoIndicators = async (): Promise<WhoIndicator[]> => {
    try {
        const response = await fetch(`${WHO_API_BASE}/Indicator`, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });
        
        if (!response.ok) {
            throw new Error(`WHO API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('Error fetching WHO indicators:', error);
        return [];
    }
};

/**
 * Fetch data for a specific indicator
 * @param indicatorCode The WHO indicator code (e.g., WHOSIS_000001)
 * @param filter Optional OData filter string
 */
export const fetchWhoIndicatorData = async (
    indicatorCode: string, 
    filter?: string
): Promise<WhoDataPoint[]> => {
    try {
        let url = `${WHO_API_BASE}/${indicatorCode}`;
        
        // Add default filter for Kenya if no filter provided, or append to existing
        // Assuming 'KEN' is the code for Kenya in WHO API (standard ISO 3-letter)
        // We can verify this with a dimension check, but for now we'll assume standard ISO
        const kenyaFilter = "SpatialDim eq 'KEN'";
        
        if (filter) {
            url += `?$filter=${filter} and ${kenyaFilter}`;
        } else {
            url += `?$filter=${kenyaFilter}`;
        }

        const response = await fetch(url, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`WHO API Error for ${indicatorCode}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error(`Error fetching WHO data for ${indicatorCode}:`, error);
        return [];
    }
};

/**
 * Fetch available dimensions
 */
export const fetchWhoDimensions = async (): Promise<WhoDimension[]> => {
    try {
        const response = await fetch(`${WHO_API_BASE}/Dimension`, {
            next: { revalidate: 86400 }
        });

        if (!response.ok) {
            throw new Error(`WHO API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('Error fetching WHO dimensions:', error);
        return [];
    }
};
