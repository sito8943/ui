# Changelog

## 0.3.1 - 2026-07-15

### Added

- Added per-size icon tokens for `IconButton`
  (`--sito-ui-size-icon-button-icon-sm`, `-md`, `-lg`) so each container size
  gets a matching default icon size (`16px`, `20px`, `24px`).

### Changed

- Updated `IconButton` size classes to set the icon size from the new per-size
  tokens, while `iconSize` / `--sito-ui-icon-button-icon-size` still override a
  single button.
- Updated the README `IconButton` sizing docs with the default icon sizes and
  token override guidance.
- Updated dependencies via `pnpm-lock.yaml` refresh.

## 0.3.0 - 2026-07-10

### Added

- Added `Dialog` exit-transition support with `exitDurationMs`,
  `onExitComplete`, `DialogState`, and `data-state`/state class hooks.
- Added `Button` size support with `size="sm" | "md" | "lg"`, exported
  `ButtonSize`, and CSS tokens for 32px, 40px, and 48px button heights.
- Added `IconButton` container size support with `size="sm" | "md" | "lg"`,
  exported `IconButtonSize`, and separate `iconSize` control for the icon.
- Added Vitest and Testing Library setup with coverage for `Button`,
  `IconButton`, `Dialog`, `DialogActions`, and `useDialog`.
- Added Storybook setup and primitive stories for `Button`, `IconButton`,
  `Dialog`, and `DialogActions`.

### Changed

- Updated `IconButton` to adapt to visible content while preserving circular
  icon-only buttons.
- Updated `IconButton` loading and icon styling so icon size stays independent
  from the container size.
- Updated `Button` size styling so size controls both padding and explicit
  height.

### Fixed

- Ignored generated `storybook-static` output.

## 0.1.0 - 2026-07-09

### Added

- Added a `format` script to run Prettier with `prettier . --write`.
- Added a GitHub Actions workflow for linting, format checking, and building.
- Added Dependabot configuration for npm dependencies and GitHub Actions updates.
- Added JSDoc descriptions for the dialog components, dialog utilities, `useDialog`, and `classNames`.

### Changed

- Restored `DIALOG_INITIAL_FOCUS` as a const object and derived `DialogInitialFocus` from it.
- Removed the deprecated TypeScript `baseUrl` option from `tsconfig.json`.
- Updated enabled buttons to use `cursor: pointer` while keeping disabled buttons as `not-allowed`.

### Fixed

- Imported the dialog focus helpers and selector constants used by `Dialog`.
- Replaced the loose `any` JSDoc annotation in `classNames` with the concrete parameter description.
