import { ArrowRight, Stars } from "lucide-react";
import { Link } from "react-router-dom";
import { TrustIndicators } from "../shared/TrustIndicators";
import { resolveHeroImage } from "../../lib/assets";

export function HeroSection() {
  const hero = resolveHeroImage();
  return (
    <section className="bg-hero border-b">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-slate-600 inline-flex items-center gap-2">
            <Stars className="h-4 w-4" />
            Complete Snow & Ice Equipment Knowledge Hub
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need to choose and operate the right commercial snow
            equipment—built by ARM TruckCorp, supported by MTech.
          </h1>
          <TrustIndicators />
          <div className="mt-6">
            <picture>
              <source srcSet={hero.webpSrcSet} type="image/webp" />
              <img
                src={hero.fallbackSrc}
                alt="ARM municipal front plow in urban snow removal service"
                loading="eager"
                decoding="async"
                className="h-32 w-auto md:h-40"
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 33vw"
                srcSet={hero.fallbackSrcSet}
              />
            </picture>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-md btn-primary border px-4 py-2 text-sm font-medium"
            >
              Get Equipment Recommendations <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#knowledge-grid"
              className="inline-flex items-center gap-2 rounded-md border border-brand text-brand px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Scroll to Topics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
