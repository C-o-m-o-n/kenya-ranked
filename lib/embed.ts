// Utilities for generating embed codes and widget URLs

import { EmbedConfig } from '@/types';

/**
 * Generate embed code for a widget
 */
export function generateEmbedCode(config: EmbedConfig): string {
    const { widgetType, widgetId, width = 300, height = 300, theme = 'light' } = config;

    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : 'https://kenyaranked.com';

    const widgetUrl = generateWidgetUrl(config);

    return `<iframe 
  src="${widgetUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  scrolling="no"
  title="Kenya Ranked - ${widgetType} widget"
  style="border: 1px solid #e2e8f0; border-radius: 12px;"
></iframe>`;
}

/**
 * Generate widget URL
 */
export function generateWidgetUrl(config: EmbedConfig): string {
    const { widgetType, widgetId, theme = 'light' } = config;

    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : 'https://kenyaranked.com';

    const params = new URLSearchParams({
        theme,
    });

    return `${baseUrl}/embed/${widgetType}/${widgetId}?${params.toString()}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        }
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
}

/**
 * Generate script tag for responsive embed
 */
export function generateResponsiveEmbedCode(config: EmbedConfig): string {
    const widgetUrl = generateWidgetUrl(config);
    const { widgetType } = config;

    return `<!-- Kenya Ranked ${widgetType} Widget -->
<div id="kenya-ranked-widget" style="position: relative; padding-bottom: 66.67%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="${widgetUrl}" 
    frameborder="0" 
    scrolling="no"
    title="Kenya Ranked - ${widgetType} widget"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 1px solid #e2e8f0; border-radius: 12px;"
  ></iframe>
</div>`;
}

/**
 * Get embed preview HTML
 */
export function getEmbedPreview(config: EmbedConfig): string {
    return generateEmbedCode(config);
}
