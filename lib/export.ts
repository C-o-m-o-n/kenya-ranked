// Utility functions for exporting data to various formats

import { Indicator, SDGGoal } from '@/types';

/**
 * Convert data to CSV format
 */
export function exportToCSV(data: any[], filename: string): void {
    if (data.length === 0) return;

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Handle values that might contain commas
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n');

    downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Convert data to Excel format using SheetJS
 */
export async function exportToExcel(data: any[], filename: string): Promise<void> {
    try {
        const XLSX = await import('xlsx');

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        // Generate Excel file
        XLSX.writeFile(workbook, filename);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        // Fallback to CSV if Excel export fails
        exportToCSV(data, filename.replace('.xlsx', '.csv'));
    }
}

/**
 * Convert data to JSON format
 */
export function exportToJSON(data: any, filename: string): void {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
}

/**
 * Trigger browser download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Format indicator data for export
 */
export function formatIndicatorForExport(indicator: Indicator) {
    return {
        Name: indicator.name,
        Category: indicator.category,
        Score: indicator.score,
        Rank: `${indicator.rank}/${indicator.totalCountries}`,
        Year: indicator.year,
        Trend: indicator.trend,
        Source: indicator.source,
        'Last Updated': indicator.lastUpdated,
        Unit: indicator.unit || 'N/A',
    };
}

/**
 * Format SDG goal data for export
 */
export function formatSDGForExport(goal: SDGGoal) {
    return {
        'Goal Number': goal.number,
        Title: goal.title,
        Description: goal.description,
        'Progress (%)': goal.progress,
        Status: goal.status,
        'Number of Indicators': goal.indicators.length,
        'Last Updated': goal.lastUpdated,
    };
}

/**
 * Export multiple indicators
 */
export function exportIndicators(indicators: Indicator[], format: 'csv' | 'excel' | 'json'): void {
    const formattedData = indicators.map(formatIndicatorForExport);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `kenya-ranked-indicators-${timestamp}`;

    switch (format) {
        case 'csv':
            exportToCSV(formattedData, `${filename}.csv`);
            break;
        case 'excel':
            exportToExcel(formattedData, `${filename}.xlsx`);
            break;
        case 'json':
            exportToJSON(indicators, `${filename}.json`);
            break;
    }
}

/**
 * Export SDG goals
 */
export function exportSDGs(goals: SDGGoal[], format: 'csv' | 'excel' | 'json'): void {
    const formattedData = goals.map(formatSDGForExport);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `kenya-ranked-sdgs-${timestamp}`;

    switch (format) {
        case 'csv':
            exportToCSV(formattedData, `${filename}.csv`);
            break;
        case 'excel':
            exportToExcel(formattedData, `${filename}.xlsx`);
            break;
        case 'json':
            exportToJSON(goals, `${filename}.json`);
            break;
    }
}
