# AnkiCraft MVC Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER INTERACTION                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        VIEW LAYER (Components)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  ControlPanel.tsx  │  │PreviewCard.tsx│  │ExportSection.tsx││
│  │                    │  │               │  │                 ││
│  │ • Color inputs     │  │ • Live preview│  │ • Templates     ││
│  │ • Range sliders    │  │ • Animations  │  │ • CSS output    ││
│  │ • Field names      │  │ • Sample data │  │ • Copy buttons  ││
│  │ • Toggles          │  │               │  │                 ││
│  └────────┬───────────┘  └──────▲───────┘  └────────▲────────┘ │
│           │                     │                     │          │
│           │          ┌──────────┴─────────────────────┘          │
│           │          │                                           │
│  ┌────────▼──────────▼──────────────────────────────────────┐   │
│  │             FormControls.tsx (Shared Components)         │   │
│  │  • FieldColor  • FieldRange  • FieldText                 │   │
│  │  • ToggleGroup • SegmentedControl                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ User Actions (onChange, onClick)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CONTROLLER LAYER (Hooks)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              useAnkiDesigner.ts (Main Hook)              │   │
│  │                                                          │   │
│  │  STATE MANAGEMENT:                                       │   │
│  │  • vars (CardVariables)                                  │   │
│  │  • fieldNames (FieldNames)                               │   │
│  │  • layout ('center' | 'left')                            │   │
│  │  • visibility (VisibilityOptions)                        │   │
│  │  • frontBackTab ('front' | 'back')                       │   │
│  │  • UI state (showExport, bounceKey, reduceMotion)        │   │
│  │                                                          │   │
│  │  ACTIONS:                                                │   │
│  │  • handlePreset(id)                                      │   │
│  │  • updateFieldName(field, value)                         │   │
│  │  • updateVisibility(option, value)                       │   │
│  │  • handleTabSwitch(tab)                                  │   │
│  │  • setVars, setLayout, setShowExport                     │   │
│  │                                                          │   │
│  │  COMPUTED VALUES (useMemo):                              │   │
│  │  • cssOutput ──────────────► generateCSS()               │   │
│  │  • frontTemplate ──────────► generateFrontTemplate()     │   │
│  │  • backTemplate ───────────► generateBackTemplate()      │   │
│  └─────────────────────┬────────────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────────┘
                         │ Reads from
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MODEL LAYER (Data)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────┐       ┌────────────────────────┐    │
│  │      types.ts          │       │     presets.ts         │    │
│  │                        │       │                        │    │
│  │ • CardVariables        │       │ • presets[]            │    │
│  │ • Preset               │◄──────┤   (Clean, Night,       │    │
│  │ • FieldNames           │       │    Pastel)             │    │
│  │ • VisibilityOptions    │       │ • sampleData           │    │
│  │ • SampleData           │       │                        │    │
│  │ • LayoutType           │       │                        │    │
│  │ • PreviewTab           │       │                        │    │
│  └────────────────────────┘       └────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ Used by
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UTILITY LAYER (Helpers)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │    colors.ts     │  │ cssGenerator.ts  │  │templateGen.ts │ │
│  │                  │  │                  │  │               │ │
│  │ • hexToRgb()     │  │ • generateCSS()  │  │• generateFront│ │
│  │ • applyOpacity() │  │                  │  │  Template()   │ │
│  │                  │  │                  │  │• generateBack │ │
│  │                  │  │                  │  │  Template()   │ │
│  └──────────────────┘  └──────────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────────┘

DATA FLOW:
1. User interacts with View components
2. View components call Controller actions (from useAnkiDesigner hook)
3. Controller updates state and computes derived values
4. Controller reads from Model data (types, presets)
5. Utilities transform data (colors, CSS, templates)
6. View re-renders with updated state
```

## Key Design Decisions

### Why MVC?

1. **Clear boundaries**: Each layer has a specific responsibility
2. **Easy testing**: Business logic is isolated in hooks
3. **Reusable components**: Views don't contain business logic
4. **Type safety**: Models define the data contracts

### State Management Strategy

- **Single source of truth**: `useAnkiDesigner` hook
- **Derived state**: Use `useMemo` for computed values
- **Controlled components**: All form inputs are controlled
- **Immutable updates**: Use spread operators for state updates

### Performance Optimizations

- `useMemo` for expensive computations (CSS, templates)
- Custom hook to prevent prop drilling
- Segmented components to avoid large re-renders
- CSS animations in global stylesheet

### TypeScript Benefits

- Compile-time type checking
- IntelliSense support
- Refactoring safety
- Self-documenting code
