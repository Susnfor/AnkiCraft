'use client';

import { useState, useEffect, useMemo } from 'react';
import { CardVariables, FieldNames, LayoutType, PreviewTab, VisibilityOptions } from '@/models/types';
import { presets } from '@/models/presets';
import { generateCSS } from '@/utils/cssGenerator';
import { generateFrontTemplate, generateBackTemplate } from '@/utils/templateGenerator';

/**
 * Custom hook that manages all the state and logic for the Anki Designer
 * This acts as the Controller in the MVC pattern
 */
export function useAnkiDesigner() {
  // Theme variables state
  const [vars, setVars] = useState<CardVariables>(presets[0].vars);
  
  // Field names state
  const [fieldNames, setFieldNames] = useState<FieldNames>({
    front: "Front",
    back: "Back",
    hint: "Hint",
    image: "Image",
    extra: "Extra",
  });
  
  // Layout and visibility state
  const [layout, setLayout] = useState<LayoutType>("center");
  const [visibility, setVisibility] = useState<VisibilityOptions>({
    showImage: true,
    showHint: true,
    showExtra: false,
    includeQuestionOnBack: true,
  });
  
  // UI state
  const [frontBackTab, setFrontBackTab] = useState<PreviewTab>("front");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  /**
   * Handle preset selection
   */
  const handlePreset = (id: string) => {
    const preset = presets.find((p) => p.id === id);
    if (preset) {
      setVars(preset.vars);
    }
  };

  /**
   * Handle tab switch with animation trigger
   */
  const handleTabSwitch = (tab: PreviewTab) => {
    setFrontBackTab(tab);
    setBounceKey((k) => k + 1);
  };

  /**
   * Update individual field names
   */
  const updateFieldName = (field: keyof FieldNames, value: string) => {
    setFieldNames(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Update individual visibility options
   */
  const updateVisibility = (option: keyof VisibilityOptions, value: boolean) => {
    setVisibility(prev => ({ ...prev, [option]: value }));
  };

  /**
   * Track prefers-reduced-motion setting
   */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    
    // Set initial value
    onChange({ matches: mq.matches } as MediaQueryListEvent);
    
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /**
   * Generate CSS output
   */
  const cssOutput = useMemo(() => generateCSS(vars), [vars]);

  /**
   * Generate front template
   */
  const frontTemplate = useMemo(
    () => generateFrontTemplate(vars, layout, fieldNames),
    [vars, layout, fieldNames]
  );

  /**
   * Generate back template
   */
  const backTemplate = useMemo(
    () => generateBackTemplate(vars, layout, fieldNames, visibility.includeQuestionOnBack),
    [vars, layout, fieldNames, visibility.includeQuestionOnBack]
  );

  return {
    // State
    vars,
    fieldNames,
    layout,
    visibility,
    frontBackTab,
    reduceMotion,
    showExport,
    bounceKey,
    
    // Computed values
    cssOutput,
    frontTemplate,
    backTemplate,
    
    // Actions
    setVars,
    handlePreset,
    updateFieldName,
    setLayout,
    updateVisibility,
    handleTabSwitch,
    setShowExport,
  };
}
