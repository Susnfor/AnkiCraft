import { Preset } from './types';

/**
 * Preset objects provide default visual values for the editor.
 * Users can switch between presets to quickly see different styles.
 */
export const presets: Preset[] = [
  {
    id: "clean",
    name: "Clean",
    vars: {
      bg: "#ffffff",
      fg: "#111111",
      accent: "#0a84ff",
      cardWidth: 520,
      radius: 18,
      padding: 22,
      font: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, Segoe UI, Roboto, Arial, sans-serif",
      baseSize: 17,
      lineHeight: 1.5,
      shadow: true,
      shadowColor: "rgba(0,0,0,0.12)",
      showHeader: false,
      showFooter: true,
      strokeWidth: 0,
      strokeColor: "#d0d0d4",
      bgOpacity: 1,
      qWeight: 600,
      aWeight: 400,
    },
  },
  {
    id: "night",
    name: "Night",
    vars: {
      bg: "#0b1220",
      fg: "#e5e7eb",
      accent: "#64d2ff",
      cardWidth: 520,
      radius: 18,
      padding: 22,
      font: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, Segoe UI, Roboto, Arial, sans-serif",
      baseSize: 17,
      lineHeight: 1.6,
      shadow: false,
      shadowColor: "rgba(0,0,0,0.28)",
      showHeader: false,
      showFooter: false,
      strokeWidth: 1,
      strokeColor: "#1f2937",
      bgOpacity: 0.98,
      qWeight: 700,
      aWeight: 450,
    },
  },
  {
    id: "pastel",
    name: "Pastel",
    vars: {
      bg: "#fff7ed",
      fg: "#3f3f46",
      accent: "#ff9f0a",
      cardWidth: 560,
      radius: 22,
      padding: 26,
      font: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, Segoe UI, Roboto, Arial, sans-serif",
      baseSize: 18,
      lineHeight: 1.7,
      shadow: true,
      shadowColor: "rgba(0,0,0,0.14)",
      showHeader: true,
      showFooter: true,
      strokeWidth: 1,
      strokeColor: "#ffbf69",
      bgOpacity: 1,
      qWeight: 600,
      aWeight: 400,
    },
  },
];

export const sampleData = {
  Front: "What is the capital of Japan?",
  Back: "Tokyo",
  Hint: "Think of the Kanto region",
  Image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Tokyo_Tower_and_around_Skyscrapers.jpg/640px-Tokyo_Tower_and_around_Skyscrapers.jpg",
  Extra: "Mnemonic: ToKYO → ToKyo",
};
