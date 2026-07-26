import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";
import { scrollToSection } from "./Utils";
import { NAV_ITEMS } from "../data";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (target: string) => {
    scrollToSection(target);
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8dfcf]/80 bg-[#fbf8f1]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Navigasi utama">
        <button onClick={() => navigate("home")} className="font-serif text-xl tracking-[0.18em] text-[#4f3d2d]">
          F <span className="text-[#a18459]">&</span> M
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => navigate(item.target)}
              className="text-xs uppercase tracking-[0.16em] text-[#6d6256] transition hover:text-[#8a6c45]"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="text-[#4f3d2d] md:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Buka menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[#e8dfcf] bg-[#fbf8f1] px-5 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button key={item.target} onClick={() => navigate(item.target)} className="block w-full py-3 text-left text-sm tracking-widest text-[#594a3b]">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}