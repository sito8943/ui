# @sito/ui

Low-level React UI primitives for Sito packages and apps.

## Install Styles

Styles are optional. Import the full stylesheet when you want the default theme
and component styles:

```ts
import "@sito/ui/styles.css";
```

Import only the theme variables when you want to provide component CSS yourself:

```ts
import "@sito/ui/theme.css";
```

## Public API

```ts
import { Button, Dialog, DialogActions, IconButton, useDialog } from "@sito/ui";
```

Exported types include `ButtonProps`, `ButtonSize`, `IconButtonProps`,
`DialogProps`, `DialogActionsProps`, `DialogState`, `IconButtonSize`, and
`UseDialogReturn`.

## Button Sizes

`Button` supports `size="sm" | "md" | "lg"` for padding. `md` is the default
size.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Icon Button Sizes

`IconButton` supports `size="sm" | "md" | "lg"` for the button container.
`md` is the default size.

```tsx
<IconButton aria-label="Add" icon="+" size="sm" />
<IconButton aria-label="Add" icon="+" size="md" />
<IconButton aria-label="Add" icon="+" size="lg" />
```

The container sizes are `28px`, `40px`, and `48px`. Icon size is separate:
override `iconSize` or `--sito-ui-icon-button-icon-size`.

## Development

Run the component test suite with:

```sh
pnpm test:run
```

Start Storybook with:

```sh
pnpm storybook
```

## Dialog Exit Transitions

`Dialog` unmounts immediately by default. Pass `exitDurationMs` when a consumer
needs to keep the portal mounted long enough for a CSS exit animation:

```tsx
<Dialog open={open} onClose={close} exitDurationMs={220}>
  Dialog content
</Dialog>
```

During that delay, the backdrop and dialog expose `data-state="closing"` plus
`sito-ui-dialog-backdrop--closing` and `sito-ui-dialog--closing` classes.
Use those hooks from consumer CSS to define the actual animation.

## Scope

This package only exposes generic primitives. It does not include dashboard
workflows, forms, translations, icon packs, routing, storage, providers, or data
fetching.
