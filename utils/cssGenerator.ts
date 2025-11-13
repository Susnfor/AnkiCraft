import { CardVariables } from '@/models/types';
import { hexToRgb } from './colors';

/**
 * Generate a single CSS string that mirrors the current UI settings for pasting into Anki Styling.
 */
export function generateCSS(vars: CardVariables): string {
  const [r, g, b] = hexToRgb(vars.bg);
  const shadow = vars.shadow
    ? `0 8px 24px ${vars.shadowColor}, 0 2px 8px ${vars.shadowColor}`
    : "none";

  return `/* Styling for Anki (paste into Styling) */
:root{
  --fg:${vars.fg};
  --accent:${vars.accent};
  --card-w:${vars.cardWidth}px;
  --radius:${vars.radius}px;
  --pad:${vars.padding}px;
  --base:${vars.baseSize}px;
  --lh:${vars.lineHeight};
  --stroke-w:${vars.strokeWidth}px;
  --stroke-color:${vars.strokeColor};
  --shadow-color:${vars.shadowColor};
  --bg-r:${r}; --bg-g:${g}; --bg-b:${b};
  --bg-opacity:${vars.bgOpacity};
  --q-weight:${vars.qWeight};
  --a-weight:${vars.aWeight};
}

.card{
  background: rgb(var(--bg-r), var(--bg-g), var(--bg-b));
  background: rgba(var(--bg-r), var(--bg-g), var(--bg-b), var(--bg-opacity));
  color: var(--fg);
  font-family: ${vars.font};
  font-size: var(--base);
  line-height: var(--lh);
  max-width: var(--card-w);
  margin: 0 auto;
  padding: var(--pad);
  border-radius: var(--radius);
  border: var(--stroke-w) solid var(--stroke-color);
  box-shadow: ${shadow};
}

.card h1,.card h2,.card h3{line-height:1.2;margin:0 0 0.6em}
.card h1{font-size:calc(var(--base)*1.5)}
.card h2{font-size:calc(var(--base)*1.25)}
.card h3{font-size:calc(var(--base)*1.1)}
.card .muted{opacity:.75}
.card .accent{color:var(--accent)}
.card img{max-width:100%;height:auto;border-radius:calc(var(--radius) - 6px)}
.card .hr{height:1px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.12),transparent);margin:16px 0}

.card.center{display:flex;flex-direction:column;align-items:center;text-align:center}
.card.left{display:flex;flex-direction:column;align-items:flex-start;text-align:left}

.card .header{font-weight:600;margin-bottom:8px;letter-spacing:.3px}
.card .footer{opacity:.7;margin-top:12px;font-size:calc(var(--base)*0.9)}
.card .hint{font-style:italic;opacity:.85;margin-top:8px}
.card .qa{font-size:calc(var(--base)*1.1);font-weight:var(--q-weight)}
.card .answer{margin-top:12px;font-weight:var(--a-weight)}
.card .extra{margin-top:12px;padding:12px;border-radius:12px;background:rgba(0,0,0,.04)}
`;
}
