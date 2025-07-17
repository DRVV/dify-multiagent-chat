# CSS Usage Guide

## Overview

The DifyMultiagentChat component now builds successfully with CSS modules support. Your styling has been preserved and is automatically bundled with the component.

## What Was Fixed

The build errors were caused by the bundler (tsup/esbuild) not understanding CSS modules. The solution involved:

1. **Added CSS Modules Plugin**: Installed `esbuild-plugin-css-modules` to handle CSS module imports
2. **Created tsup Configuration**: Added `tsup.config.ts` to configure the build process with CSS modules support
3. **Updated Build Script**: Simplified the build command to use the new configuration

## How CSS is Handled

- **CSS Modules**: Your `.module.css` files are processed as CSS modules
- **Automatic Bundling**: CSS is automatically bundled into `dist/index.css`
- **Source Maps**: CSS source maps are generated for debugging
- **Class Name Scoping**: CSS classes are automatically scoped to prevent conflicts

## Generated Files

After building, you'll find:
- `dist/index.css` - All your component styles bundled together
- `dist/index.css.map` - Source map for debugging
- `dist/index.js` / `dist/index.mjs` - JavaScript bundles
- `dist/index.d.ts` - TypeScript declarations

## Usage in Consumer Projects

When using your component in other projects:

```tsx
import { DifyMultiagentChat } from '@drvv/dify-multiagent-chat';
// CSS is automatically included when importing the component
```

The CSS is automatically injected when the component is imported, so consumers don't need to manually import CSS files.

## Your Current Styling

Your styling includes:
- **Chat Container**: Clean white background with subtle shadows
- **Message Bubbles**: Distinct styling for user vs assistant messages
- **Input Field**: Rounded input with focus states
- **Send Button**: Circular button with hover effects
- **Scrollbar**: Custom styled scrollbar for message container
- **Loading States**: Streaming indicators and disabled states

All of this styling is preserved and working correctly after the build fix.
