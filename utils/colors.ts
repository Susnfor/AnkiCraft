/**
 * Utility functions for color conversion and manipulation
 */

/**
 * Converts a hex colour string to numeric RGB values.
 * Used by opacity application and export CSS.
 */
export function hexToRgb(hex: string): [number, number, number] {
  if (!hex || !hex.startsWith('#')) return [255, 255, 255];
  
  let r = 0, g = 0, b = 0;
  
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  
  return [r, g, b];
}

/**
 * Returns an rgba string that applies an explicit alpha to a hex colour.
 */
export function applyOpacity(hex: string, opacity: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${opacity})`;
}
