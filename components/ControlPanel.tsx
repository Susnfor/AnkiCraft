'use client';

import { CardVariables, FieldNames, VisibilityOptions } from '@/models/types';
import { presets } from '@/models/presets';
import {
  FieldColor,
  FieldRange,
  FieldText,
  ToggleGroup,
  SegmentedControl,
} from './FormControls';

interface ControlPanelProps {
  vars: CardVariables;
  setVars: (vars: CardVariables) => void;
  handlePreset: (id: string) => void;
  fieldNames: FieldNames;
  updateFieldName: (field: keyof FieldNames, value: string) => void;
  layout: 'center' | 'left';
  setLayout: (layout: 'center' | 'left') => void;
  showImage: boolean;
  showHint: boolean;
  showExtra: boolean;
  includeQuestionOnBack: boolean;
  updateVisibility: (option: keyof VisibilityOptions, value: boolean) => void;
  showExport: boolean;
  setShowExport: (show: boolean) => void;
}

/**
 * Control panel component containing all the design customisation controls
 */
export function ControlPanel({
  vars,
  setVars,
  handlePreset,
  fieldNames,
  updateFieldName,
  layout,
  setLayout,
  showImage,
  showHint,
  showExtra,
  includeQuestionOnBack,
  updateVisibility,
  showExport,
  setShowExport,
}: ControlPanelProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white/90 rounded-2xl shadow-sm" style={{ border: '1px solid #e5e5ea' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #efeff4' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold" style={{ letterSpacing: '0.2px' }}>
              <span style={{ color: vars.accent }}>Anki</span>
              <span>Craft</span>
            </h2>
            <select
              className="border rounded-lg px-2 py-1 text-sm"
              onChange={(e) => handlePreset(e.target.value)}
              defaultValue={presets[0].id}
              aria-label="Preset"
            >
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  Theme: {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="px-5 py-4 grid grid-cols-2 gap-4">
          {/* Colours */}
          <FieldColor label="Background" value={vars.bg} onChange={(v) => setVars({ ...vars, bg: v })} />
          <FieldColor label="Text" value={vars.fg} onChange={(v) => setVars({ ...vars, fg: v })} />
          <FieldColor label="Accent" value={vars.accent} onChange={(v) => setVars({ ...vars, accent: v })} />

          {/* Sizing */}
          <FieldRange
            label="Card width"
            min={360}
            max={720}
            value={vars.cardWidth}
            onChange={(v) => setVars({ ...vars, cardWidth: v })}
            suffix="px"
          />
          <FieldRange
            label="Radius"
            min={0}
            max={28}
            value={vars.radius}
            onChange={(v) => setVars({ ...vars, radius: v })}
            suffix="px"
          />
          <FieldRange
            label="Padding"
            min={8}
            max={48}
            value={vars.padding}
            onChange={(v) => setVars({ ...vars, padding: v })}
            suffix="px"
          />
          <FieldRange
            label="Base size"
            min={14}
            max={22}
            value={vars.baseSize}
            onChange={(v) => setVars({ ...vars, baseSize: v })}
            suffix="px"
          />
          <FieldRange
            label="Line height"
            min={12}
            max={22}
            value={Math.round(vars.lineHeight * 10)}
            onChange={(v) => setVars({ ...vars, lineHeight: v / 10 })}
          />

          {/* Layout and Shadow */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1">Layout</label>
              <SegmentedControl
                options={[
                  { value: 'center', label: 'Centre' },
                  { value: 'left', label: 'Left' },
                ]}
                value={layout}
                onChange={(v) => setLayout(v as 'center' | 'left')}
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Shadow</label>
              <SegmentedControl
                options={[
                  { value: 'true', label: 'On' },
                  { value: 'false', label: 'Off' },
                ]}
                value={String(vars.shadow)}
                onChange={(v) => setVars({ ...vars, shadow: v === 'true' })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm block mb-1">Shadow colour</label>
              <input
                type="text"
                placeholder="rgba(0,0,0,0.12) or #00000080"
                className="w-full border rounded-xl px-3 py-2"
                value={vars.shadowColor}
                onChange={(e) => setVars({ ...vars, shadowColor: e.target.value })}
              />
            </div>
          </div>

          {/* Stroke */}
          <FieldRange
            label="Stroke width"
            min={0}
            max={8}
            value={vars.strokeWidth}
            onChange={(v) => setVars({ ...vars, strokeWidth: v })}
            suffix="px"
          />
          <FieldColor
            label="Stroke colour"
            value={vars.strokeColor}
            onChange={(v) => setVars({ ...vars, strokeColor: v })}
          />

          {/* Opacity and Font Weights */}
          <FieldRange
            label="Background opacity"
            min={0.1}
            max={1}
            step={0.05}
            value={vars.bgOpacity}
            onChange={(v) => setVars({ ...vars, bgOpacity: Number(v.toFixed(2)) })}
          />
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <FieldRange
              label="Question weight"
              min={100}
              max={900}
              step={100}
              value={vars.qWeight}
              onChange={(v) => setVars({ ...vars, qWeight: v })}
            />
            <FieldRange
              label="Answer weight"
              min={100}
              max={900}
              step={100}
              value={vars.aWeight}
              onChange={(v) => setVars({ ...vars, aWeight: v })}
            />
          </div>

          {/* Font */}
          <div className="col-span-2">
            <label className="text-sm block mb-1">Font stack</label>
            <input
              type="text"
              className="w-full border rounded-xl px-3 py-2"
              value={vars.font}
              onChange={(e) => setVars({ ...vars, font: e.target.value })}
            />
          </div>

          {/* Field Names */}
          <FieldText label="Front field" value={fieldNames.front} onChange={(v) => updateFieldName('front', v)} />
          <FieldText label="Back field" value={fieldNames.back} onChange={(v) => updateFieldName('back', v)} />
          <FieldText label="Hint field" value={fieldNames.hint} onChange={(v) => updateFieldName('hint', v)} />
          <FieldText label="Image field" value={fieldNames.image} onChange={(v) => updateFieldName('image', v)} />
          <div className="col-span-2">
            <FieldText label="Extra field" value={fieldNames.extra} onChange={(v) => updateFieldName('extra', v)} />
          </div>

          {/* Visibility Toggles */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <ToggleGroup label="Show image" value={showImage} onChange={(v) => updateVisibility('showImage', v)} />
            <ToggleGroup label="Show hint" value={showHint} onChange={(v) => updateVisibility('showHint', v)} />
            <ToggleGroup label="Show extra" value={showExtra} onChange={(v) => updateVisibility('showExtra', v)} />
            <ToggleGroup
              label="Question on back"
              value={includeQuestionOnBack}
              onChange={(v) => updateVisibility('includeQuestionOnBack', v)}
            />
          </div>

          {/* Header & Footer */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <ToggleGroup
              label="Show header"
              value={vars.showHeader}
              onChange={(v) => setVars({ ...vars, showHeader: v })}
            />
            <ToggleGroup
              label="Show footer"
              value={vars.showFooter}
              onChange={(v) => setVars({ ...vars, showFooter: v })}
            />
          </div>

          {/* Export Button */}
          <div className="col-span-2 flex gap-3 pt-2">
            <button
              type="button"
              className="primary-btn"
              onClick={() => setShowExport(!showExport)}
            >
              {showExport ? 'Hide' : 'Export'} Anki Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
