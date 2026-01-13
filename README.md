# Prenda Design System Theme (MUI v6)

Prenda’s opinionated MUI v6 theme with typography, palette, and component overrides to match the design system. Ships with a provider, a default theme instance, and a helper to create custom themes.

## Installation

- Configure npm for the `@prenda-school` scope (GitHub Packages), e.g. in `.npmrc`:
  ```
  @prenda-school:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=<YOUR_PAT>
  ```
- Install the package (MUI v6 and Emotion are required peers):
  ```
  npm install @prenda-school/prenda-ds @mui/material @emotion/react @emotion/styled
  ```

## Quick start

```tsx
import { PrendaThemeProvider } from "@prenda-school/prenda-ds";
import { Button, Typography } from "@mui/material";

export function App() {
  return (
    <PrendaThemeProvider>
      <Typography variant="T22">Hello from Prenda</Typography>
      <Button variant="primary">Primary</Button>
      <Button variant="stroke" color="prendaBlue">
        Stroke
      </Button>
    </PrendaThemeProvider>
  );
}
```

## Theme API

- `prendaTheme`: ready-to-use theme instance with CssBaseline fonts prewired.
- `createPrendaTheme(options?)`: build a theme; `fontBasePath` overrides the hosted font path (defaults to `/pds-assets-v1/fonts`).
- `PrendaThemeProvider`: wraps `ThemeProvider` and injects `CssBaseline` by default (`includeCssBaseline` prop toggles it).

### Design tokens and variants

- Palette extensions: `prendaBlue`, `prendaGrey`, `prendaRed`, `prendaYellow`, `prendaGreen`, `prendaMagenta`, `prendaPurple (typed for `color`props on MUI components like`Button`).
- Typography variants: `label`, `description`, `T18`, `T22`, `T28`, `T32` with mapped HTML tags.
- Button variants: `primary` (default), `stroke`, `ghost`; sizes tuned for small/medium/large and ripple disabled by default.
- Icons: adds `fontSize="huge"` to `SvgIcon`.
- Component overrides for Tooltip, Dialog, TextField (OutlinedInput), Stepper, Tabs, Pagination, Alert (with Prenda icon set), Switch, and more. CssVariables are enabled on the theme.

## Using self-hosted fonts

Fonts are loaded via `CssBaseline` `@font-face` rules. If your font assets live elsewhere, point to them:

```ts
import {
  createPrendaTheme,
  PrendaThemeProvider,
} from "@prenda-school/prenda-ds";

const theme = createPrendaTheme({ fontBasePath: "/static/fonts/prenda" });
```

## Development

- Install deps: `npm install`
- Type-check: `npm run type-check`
- Build: `npm run build`
- Format/lint: `npm run format-lint`

To inspect the publish artifact locally, run `npm pack` after building.
