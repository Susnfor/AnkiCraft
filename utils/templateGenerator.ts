import { CardVariables, FieldNames, LayoutType } from '@/models/types';

/**
 * Build the front HTML template that Anki expects, based on current field names and layout.
 */
export function generateFrontTemplate(
  vars: CardVariables,
  layout: LayoutType,
  fields: FieldNames
): string {
  const layClass = layout === "left" ? "left" : "center";
  
  return `<!-- Front Template -->
<div class="card ${layClass} front">
  ${vars.showHeader ? `<div class="header">{{Deck}}</div>` : ""}
  <div class="qa accent">{{${fields.front}}}</div>
  {{#${fields.hint}}}<div class="hint">Hint: {{${fields.hint}}}</div>{{/${fields.hint}}}
  {{#${fields.image}}}<img alt="image" src="{{${fields.image}}}"/>{{/${fields.image}}}
  ${vars.showFooter ? `<div class="footer muted">{{tags}}</div>` : ""}
</div>`;
}

/**
 * Build the back HTML template, optionally including the question, hint, image, and extra field.
 */
export function generateBackTemplate(
  vars: CardVariables,
  layout: LayoutType,
  fields: FieldNames,
  includeQuestionOnBack: boolean
): string {
  const layClass = layout === "left" ? "left" : "center";
  
  return `<!-- Back Template -->
<div class="card ${layClass} back">
  ${vars.showHeader ? `<div class="header">{{Deck}}</div>` : ""}
  ${includeQuestionOnBack ? `<div class="qa accent">{{${fields.front}}}</div>` : ""}
  ${includeQuestionOnBack ? `<div class="hr"></div>` : ""}
  <div class="answer">{{${fields.back}}}</div>
  {{#${fields.image}}}<img alt="image" src="{{${fields.image}}}"/>{{/${fields.image}}}
  {{#${fields.hint}}}<div class="hint">Hint: {{${fields.hint}}}</div>{{/${fields.hint}}}
  {{#${fields.extra}}}<div class="extra">{{${fields.extra}}}</div>{{/${fields.extra}}}
  ${vars.showFooter ? `<div class="footer muted">{{tags}}</div>` : ""}
</div>`;
}
