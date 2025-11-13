'use client';

/**
 * Reusable form control components for the Anki Designer
 */

interface FieldColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function FieldColor({ label, value, onChange }: FieldColorProps) {
  return (
    <label className="text-sm">
      <span className="block mb-1">{label}</span>
      <input
        type="color"
        className="block w-full h-9 p-0 border rounded-xl cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

interface FieldRangeProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}

export function FieldRange({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = '',
}: FieldRangeProps) {
  return (
    <label className="text-sm">
      <span className="block mb-1">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className="block w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="text-xs opacity-70">
        {value}
        {suffix}
      </span>
    </label>
  );
}

interface FieldTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FieldText({ label, value, onChange, placeholder }: FieldTextProps) {
  return (
    <label className="text-sm block">
      <span className="block mb-1">{label}</span>
      <input
        type="text"
        className="w-full border rounded-xl px-3 py-2"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value || label.split(' ')[0])}
      />
    </label>
  );
}

interface ToggleGroupProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleGroup({ label, value, onChange }: ToggleGroupProps) {
  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>
      <div className="segmented">
        <button
          type="button"
          className={value ? 'active' : ''}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={!value ? 'active' : ''}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="segmented">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? 'active' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
