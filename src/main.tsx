import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

declare global {
  interface Window {
    MTechKnowledgeHub?: {
      mount: (elOrId?: string | HTMLElement) => void;
    };
  }
}

function resolveElement(target?: string | HTMLElement): HTMLElement | null {
  if (!target) return document.getElementById("mtech-knowledge-hub-root");
  if (typeof target === "string") return document.getElementById(target);
  return target;
}

export function mount(elOrId?: string | HTMLElement) {
  const el = resolveElement(elOrId) || document.getElementById("root");
  if (!el) return;
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Expose for WordPress embed
window.MTechKnowledgeHub = { mount };

// Auto-mount for local dev (index.html) or if container exists in WP
if (
  document.getElementById("root") ||
  document.getElementById("mtech-knowledge-hub-root")
) {
  mount();
}
