'use client';

import { useState } from 'react';

interface ExportSectionProps {
  frontTemplate: string;
  backTemplate: string;
  cssOutput: string;
  showExport: boolean;
  reduceMotion: boolean;
}

/**
 * Export section component that displays copyable templates and CSS
 */
export function ExportSection({
  frontTemplate,
  backTemplate,
  cssOutput,
  showExport,
  reduceMotion,
}: ExportSectionProps) {
  return (
    <div
      className="mt-6 overflow-hidden"
      style={{
        maxHeight: showExport ? 1200 : 0,
        opacity: showExport ? 1 : 0,
        transition: reduceMotion ? 'none' : 'max-height 360ms ease, opacity 240ms ease',
      }}
    >
      <div className="p-4 mt-2 rounded-2xl bg-white/85" style={{ border: '1px solid #efeff4' }}>
        <h3 className="text-[17px] font-semibold mb-2">Export Anki Templates</h3>
        <CodeBlock title="Front Template" text={frontTemplate} />
        <CodeBlock title="Back Template" text={backTemplate} />
        <CodeBlock title="Styling CSS" text={cssOutput} />
        <p className="text-xs opacity-70 mt-2">
          In Anki, go to Note Type → Cards… and paste into the relevant boxes. Rename fields if
          needed.
        </p>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  title: string;
  text: string;
}

function CodeBlock({ title, text }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    } catch {
      // Silent fail if clipboard API not available
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold">{title}</div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded-lg"
          style={{ border: '1px solid #e5e5ea' }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <textarea
        readOnly
        value={text}
        className="w-full h-40 font-mono text-xs border rounded-xl p-2 bg-white/90"
        style={{ border: '1px solid #e5e5ea' }}
      />
    </div>
  );
}
