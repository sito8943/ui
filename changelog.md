# Changelog

## 0.4.0 - 2026-08-30

### Added

- Added `ContextMenu`, `ContextMenuItem`, and `ContextMenuSeparator` primitives
  with portal rendering, viewport clamping (`clampToViewport`,
  `viewportPadding`), configurable dismissal (`closeOnEscape`, `closeOnTab`,
  `closeOnPointerDownOutside`), focus restore on close, and roving keyboard
  navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`).
- Added `ContextMenuItem` `leading` and `shortcut` slots, plus exported
  `ContextMenuProps`, `ContextMenuItemProps`, `ContextMenuSeparatorProps`, and
  `ContextMenuPosition` types.
- Added `useContextMenu` hook (`open`, `position`, `payload`, `openAt`,
  `close`) with the exported `UseContextMenuReturn` type.
- Added `Spinner` primitive for indeterminate progress. It is decorative by
  default (`aria-hidden`) and becomes `role="status"` with an accessible name
  when `label` is provided. Exported `SpinnerProps`.
- Added public constants `BUTTON_VARIANTS`, `BUTTON_COLOR_VARIANTS`,
  `BUTTON_SIZES`, `ICON_BUTTON_SIZES`, and `DIALOG_INITIAL_FOCUS`.
- Added CSS tokens for the context menu (`--sito-ui-size-context-menu-*`,
  `--sito-ui-radius-context-menu*`, `--sito-ui-shadow-context-menu`,
  `--sito-ui-z-index-context-menu`, `--sito-ui-context-menu-disabled-opacity`,
  `--sito-ui-font-size-context-menu-shortcut`) and `--sito-ui-color-text-muted`.
- Added generic spinner tokens `--sito-ui-size-spinner`,
  `--sito-ui-spinner-border-width`, `--sito-ui-motion-duration-spinner`, and
  `--sito-ui-motion-duration-spinner-reduced`.
- Added tests for `ContextMenu`, `Spinner`, and `useContextMenu`, and a
  `Spinner` Storybook story.
- Added `pnpm-workspace.yaml` mirroring the `package.json` `pnpm` overrides in
  preparation for pnpm 11.

### Changed

- Updated `Button` to render its loading indicator with `Spinner`; the
  `sito-ui-button__spinner` class and `data-sito-ui="button-spinner"` hook are
  preserved.
- Updated `--sito-ui-size-button-spinner`,
  `--sito-ui-button-spinner-border-width`, `--sito-ui-motion-duration-spin`,
  and `--sito-ui-motion-duration-spin-reduced` to alias the new spinner tokens
  (existing overrides keep working).
- Updated `ARCHITECTURE_RULES.md` and the README with the new primitives, hook,
  constants, and token docs.
- Marked `esbuild` as an ignored built dependency in the pnpm config.

## 0.3.3 - 2026-07-17

### Added

- Added `headerClassName`, `titleClassName`, and `closeButtonClassName` to
  `Dialog` so higher-level wrappers can customize its header, title, and close
  button styles.
- Added test coverage for the new `Dialog` class hooks and stacked-dialog
  dismissal behavior.

### Fixed

- Updated stacked dialogs so only the topmost dialog handles Escape and
  backdrop dismissal.
- Prevented a background dialog from restoring focus while a dialog above it
  is still active.

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
