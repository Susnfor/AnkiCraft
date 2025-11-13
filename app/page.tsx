'use client';

import { useAnkiDesigner } from '@/hooks/useAnkiDesigner';
import { ControlPanel } from '@/components/ControlPanel';
import { PreviewCard } from '@/components/PreviewCard';
import { ExportSection } from '@/components/ExportSection';
import { SegmentedControl } from '@/components/FormControls';

/**
 * AnkiCraft main designer view
 * Purpose: interactive editor to configure Anki card visuals and export HTML/CSS templates
 */
export default function Home() {
  const {
    vars,
    fieldNames,
    layout,
    visibility,
    frontBackTab,
    reduceMotion,
    showExport,
    bounceKey,
    cssOutput,
    frontTemplate,
    backTemplate,
    setVars,
    handlePreset,
    updateFieldName,
    setLayout,
    updateVisibility,
    handleTabSwitch,
    setShowExport,
  } = useAnkiDesigner();

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: 'linear-gradient(180deg, #f5f5f7, #eaebef)',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, Segoe UI, Roboto, Arial, sans-serif",
        color: '#1c1c1e',
      }}
    >
      {/* Brand header */}
      <header className="max-w-6xl mx-auto mb-6">
        <div
          className="flex items-center justify-between bg-white/70 rounded-2xl px-5 py-3"
          style={{ border: '1px solid #e5e5ea', backdropFilter: 'saturate(180%) blur(12px)' }}
        >
          <div className="text-[20px] font-semibold tracking-tight">
            <span style={{ color: vars.accent }}>Anki</span>
            <span style={{ color: '#1c1c1e' }}>Craft</span>
          </div>
          <div className="text-sm opacity-70">Customiser For Your Anki Cards</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <ControlPanel
          vars={vars}
          setVars={setVars}
          handlePreset={handlePreset}
          fieldNames={fieldNames}
          updateFieldName={updateFieldName}
          layout={layout}
          setLayout={setLayout}
          showImage={visibility.showImage}
          showHint={visibility.showHint}
          showExtra={visibility.showExtra}
          includeQuestionOnBack={visibility.includeQuestionOnBack}
          updateVisibility={updateVisibility}
          showExport={showExport}
          setShowExport={setShowExport}
        />

        {/* Preview and Export Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 rounded-2xl shadow-sm p-5" style={{ border: '1px solid #e5e5ea' }}>
            {/* Tab controls */}
            <div className="flex items-center gap-2">
              <SegmentedControl
                options={[
                  { value: 'front', label: 'Front' },
                  { value: 'back', label: 'Back' },
                ]}
                value={frontBackTab}
                onChange={(tab) => handleTabSwitch(tab as 'front' | 'back')}
              />
            </div>

            {/* Preview card */}
            <div className="mt-4">
              <PreviewCard
                vars={vars}
                layout={layout}
                side={frontBackTab}
                bounceKey={bounceKey}
                reduceMotion={reduceMotion}
                frontField={fieldNames.front}
                backField={fieldNames.back}
                hintField={fieldNames.hint}
                imageField={fieldNames.image}
                extraField={fieldNames.extra}
                showImage={visibility.showImage}
                showHint={visibility.showHint}
                showExtra={visibility.showExtra}
                includeQuestionOnBack={visibility.includeQuestionOnBack}
              />
            </div>

            {/* Export section */}
            <ExportSection
              frontTemplate={frontTemplate}
              backTemplate={backTemplate}
              cssOutput={cssOutput}
              showExport={showExport}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
