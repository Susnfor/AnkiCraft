/**
 * Type definitions for the Anki Designer application
 */

export interface CardVariables {
  bg: string;              // card background base colour
  fg: string;              // text colour
  accent: string;          // accent colour used for questions and accents
  cardWidth: number;       // max width of the card in pixels
  radius: number;          // border radius in pixels
  padding: number;         // inner spacing in pixels
  font: string;            // font family stack
  baseSize: number;        // base font size in pixels
  lineHeight: number;      // line height scale
  shadow: boolean;         // shadow toggle
  shadowColor: string;     // shadow colour
  showHeader: boolean;     // show deck header on card
  showFooter: boolean;     // show tags footer on card
  strokeWidth: number;     // border stroke width
  strokeColor: string;     // border stroke colour
  bgOpacity: number;       // background opacity applied to the background colour only
  qWeight: number;         // font weight for the question text
  aWeight: number;         // font weight for the answer text
}

export interface Preset {
  id: string;
  name: string;
  vars: CardVariables;
}

export interface FieldNames {
  front: string;
  back: string;
  hint: string;
  image: string;
  extra: string;
}

export interface VisibilityOptions {
  showImage: boolean;
  showHint: boolean;
  showExtra: boolean;
  includeQuestionOnBack: boolean;
}

export interface SampleData {
  Front: string;
  Back: string;
  Hint: string;
  Image: string;
  Extra: string;
}

export type LayoutType = "center" | "left";
export type PreviewTab = "front" | "back";
