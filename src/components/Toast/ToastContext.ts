import { createContext } from "react";

import type { ToastFunction } from "./types";

export const ToastContext = createContext<ToastFunction | null>(null);
