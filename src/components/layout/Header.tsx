import { BookOpen, Snowflake } from "lucide-react";
import { RegionSelector } from "../shared/RegionSelector";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-semibold text-brand"
        >
          <Snowflake className="h-5 w-5" />
          <span>MTech Knowledge Hub</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:underline text-brand">
            Knowledge Hub
          </Link>
          <Link
            to="/downloads"
            className="hover:underline inline-flex items-center gap-1 text-brand"
          >
            <BookOpen className="h-4 w-4" />
            Literature
          </Link>
          <RegionSelector />
        </nav>
      </div>
    </header>
  );
}
