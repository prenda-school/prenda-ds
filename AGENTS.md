# Prenda DS

Shared startup instructions. Edit `AGENTS.md`; `CLAUDE.md` imports it.

## Purpose and map

Published `@prenda-school/prenda-ds` theme and reusable React components. Separate
from the Nx `design-system`/Spark repo and the `prenda-icons` package.

- `src/index.ts`: public API; `src/theme.ts`: theme and MUI augmentation;
  `src/colors.ts`: colors; `src/PrendaThemeProvider.tsx`: provider.
- `src/components/`: reusable components; `demo/`: local visual references.
- `tsup.config.js`: bundling; `biome.json`: formatting/lint conventions.
- README describes theme usage and fonts, but still says **MUI v6**. The current
  manifest requires **MUI ^9**; consult `peerDependencies` before integration.

## Development and checks

At root: `nvm use`, `npm install`. Use `.npmrc` with an existing package token.

- `npm run type-check`: TypeScript API checks.
- `npm run build`: tsup output in `dist/`.
- `npm run format-lint`: **rewrites** `src/` using Biome. For a read-only check
  with dependencies installed, use `npx biome check src/`.
- `npm pack` after building inspects packaging locally; `prepublishOnly` runs
  type-check and build. No test script is defined.

## Publishing and consumer testing

- Publishing is manual: bump `version`, then `npm publish` from the root
  (`publishConfig` targets `npm.pkg.github.com`; `prepublishOnly` runs type-check
  and build). There is no publish workflow, unlike `prenda-icons`. `NPM_TOKEN`
  must be a GitHub token with `write:packages`; consumers only need `read:packages`.
- `package-lock.json` links `@prenda-school/prenda-icons` to `../prenda-icons`, a
  sibling checkout. Builds from a clone or worktree that does not sit next to
  `prenda-icons` fail the DTS step with "Cannot find module
  @prenda-school/prenda-icons".
- Local consumer test loop: `npm run build && npm pack` here, then in the app
  `npm uninstall @prenda-school/prenda-ds && npm install ../prenda-ds/<tarball>.tgz`.
  Reinstalling a same-named tarball does re-extract. Switching back from a `file:`
  dependency to a registry range needs `npm uninstall` + `npm install X@^ver`;
  plain `npm install` keeps the old lock resolution. Run the app's install with
  the app's Node (`.nvmrc`); discover, learn-app, guide-app, and marketplace are
  `engine-strict` and reject the Node 26 this repo's `.nvmrc` selects.
- Consumers: discover, learn-app, marketplace on 0.3.x with MUI 9; guide-app still
  on 0.1.5 with MUI 6.4 (upgrade pending). Toasts are a DS API
  (`ToastsProvider`/`useToasts`); apps should not depend on notistack directly.
- The package ships CJS + ESM via `main`/`module` with no `exports` field. Next 16
  consumers must add both `@prenda-school` packages to `transpilePackages`, or MUI
  resolves twice on the server and the theme context is null during prerender
  (`useMediaQuery` crashes with "reading 'breakpoints'"). Adding an `exports`
  field would change consumer resolution; treat it as a breaking change.

Preserve public exports, theme variants, type augmentation, and font asset paths.
Check actual consumer versions: sibling applications may still pin older releases
of this package. Edit source and regenerate output through the build. Visually
verify affected components in a compatible consumer/demo; a type-check alone
does not establish appearance. Keep unrelated local edits intact and update
this guide/README when package compatibility or the public API changes.
