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
`DialogActionsProps`, and `UseDialogReturn`.

## Scope

This package only exposes generic primitives. It does not include dashboard
workflows, forms, translations, icon packs, routing, storage, providers, or data
fetching.
