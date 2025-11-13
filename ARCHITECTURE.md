# AnkiCraft - Next.js Version

A Next.js application for designing and customizing Anki flashcard templates with a clean MVC architecture.

## Project Structure (MVC Pattern)

### Models (`/models`)
The data layer containing type definitions and presets:

- **`types.ts`** - TypeScript interfaces and type definitions for the entire application
  - `CardVariables` - Visual theme configuration
  - `Preset` - Predefined theme templates
  - `FieldNames` - Anki field name mappings
  - `VisibilityOptions` - Card element visibility toggles
  - `SampleData` - Preview data structure

- **`presets.ts`** - Preset theme configurations (Clean, Night, Pastel)
  - Contains predefined visual themes
  - Includes sample data for preview

### Controllers (`/hooks`)
Business logic and state management:

- **`useAnkiDesigner.ts`** - Main controller hook managing all application state
  - Card visual variables
  - Field name configurations
  - Layout and visibility options
  - UI state (tabs, animations, export visibility)
  - Preset selection logic
  - Computed values (CSS output, templates)
  - Actions and handlers

### Views (`/components`)
UI components that render the interface:

- **`FormControls.tsx`** - Reusable input components
  - `FieldColor` - Color picker input
  - `FieldRange` - Range slider with value display
  - `FieldText` - Text input field
  - `ToggleGroup` - Yes/No segmented control
  - `SegmentedControl` - Multi-option segmented control

- **`ControlPanel.tsx`** - Left sidebar with all design controls
  - Color settings
  - Size and spacing controls
  - Layout and shadow options
  - Font customization
  - Field name inputs
  - Visibility toggles
  - Preset selector

- **`PreviewCard.tsx`** - Live preview of the Anki card
  - Renders front/back sides
  - Applies all visual customizations
  - Shows sample data
  - Includes bounce animation

- **`ExportSection.tsx`** - Export templates and CSS
  - Collapsible export panel
  - Code blocks with copy buttons
  - Front/back templates
  - Anki CSS styling

### Utilities (`/utils`)
Helper functions and generators:

- **`colors.ts`** - Color manipulation utilities
  - `hexToRgb()` - Converts hex to RGB values
  - `applyOpacity()` - Applies opacity to hex colors

- **`cssGenerator.ts`** - CSS template generation
  - `generateCSS()` - Creates Anki-compatible CSS from card variables

- **`templateGenerator.ts`** - HTML template generation
  - `generateFrontTemplate()` - Builds front card HTML
  - `generateBackTemplate()` - Builds back card HTML

### Main Application (`/app`)

- **`page.tsx`** - Main page component that assembles all parts
  - Uses the `useAnkiDesigner` hook
  - Renders `ControlPanel`, `PreviewCard`, and `ExportSection`
  - Handles tab switching
  - Provides application layout

- **`globals.css`** - Global styles and animations
  - Segmented control styles
  - Button styles
  - Card bounce animation keyframes

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- ✅ Live preview of Anki card designs
- ✅ Three preset themes (Clean, Night, Pastel)
- ✅ Full customization of colors, fonts, spacing, and shadows
- ✅ Support for images, hints, and extra fields
- ✅ Export templates and CSS for Anki
- ✅ Smooth animations and transitions
- ✅ Accessibility support (reduces motion when preferred)
- ✅ Clean MVC architecture for maintainability

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

## Architecture Benefits

The MVC pattern provides:

1. **Separation of Concerns** - Models, controllers, and views are clearly separated
2. **Maintainability** - Each part can be modified independently
3. **Testability** - Business logic in hooks can be tested separately
4. **Reusability** - Components and utilities can be easily reused
5. **Scalability** - Easy to add new features without breaking existing code
