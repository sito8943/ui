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

Exported types include `ButtonProps`, `IconButtonProps`, `DialogProps`,
`DialogActionsProps`, `DialogState`, and `UseDialogReturn`.

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
