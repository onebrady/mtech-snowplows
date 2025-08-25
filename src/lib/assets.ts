type HeroConfig = {
  webpSrcSet?: string;
  fallbackSrc?: string;
  fallbackSrcSet?: string;
};

declare global {
  interface Window {
    MTechKnowledgeHubHero?: HeroConfig;
  }
}

export function resolveHeroImage(): Required<HeroConfig> {
  try {
    const el =
      document.getElementById("mtech-knowledge-hub-root") ||
      document.getElementById("root");
    const ds = (el as HTMLElement | null)?.dataset || {};

    const winCfg = window.MTechKnowledgeHubHero || {};

    const webpSrcSet =
      ds.heroWebp ||
      winCfg.webpSrcSet ||
      "/wp-content/uploads/hero-knowledge-hub-640.webp 640w, /wp-content/uploads/hero-knowledge-hub-1024.webp 1024w, /wp-content/uploads/hero-knowledge-hub.webp 1600w";

    const fallbackSrc =
      ds.heroFallback || winCfg.fallbackSrc || "/hero-knowledge-hub.svg";

    const fallbackSrcSet =
      ds.heroFallbackSrcset || winCfg.fallbackSrcSet || "/hero-knowledge-hub.svg 800w";

    return { webpSrcSet, fallbackSrc, fallbackSrcSet };
  } catch {
    return {
      webpSrcSet:
        "/wp-content/uploads/hero-knowledge-hub-640.webp 640w, /wp-content/uploads/hero-knowledge-hub-1024.webp 1024w, /wp-content/uploads/hero-knowledge-hub.webp 1600w",
      fallbackSrc: "/hero-knowledge-hub.svg",
      fallbackSrcSet: "/hero-knowledge-hub.svg 800w",
    };
  }
}


