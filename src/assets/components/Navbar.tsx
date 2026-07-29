import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";
import { scrollToSection } from "./Utils";
import { NAV_ITEMS } from "../data";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (target: string): void => {
    scrollToSection(target);
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-theme-border/80 bg-theme-page/90 backdrop-blur-md lg:block">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Navigasi utama"
      >
        <button
          type="button"
          onClick={() => navigate("home")}
          className="font-serif text-xl tracking-[0.18em] text-theme-primary"
        >
          F <span className="text-theme-text-muted">&</span> M
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => navigate(item.target)}
              className="text-xs uppercase tracking-[0.16em] text-theme-text-muted transition-colors hover:text-theme-primary"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="text-theme-primary md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-theme-border bg-theme-page px-5 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => navigate(item.target)}
              className="block w-full py-3 text-left text-sm tracking-widest text-theme-text transition-colors hover:text-theme-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
