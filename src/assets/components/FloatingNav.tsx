
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Home,
  Menu,
  X,
} from "lucide-react";
import { NAV_ITEMS } from "../data";


const EASE = [0.22, 1, 0.36, 1] as const;

function scrollToSection(target: string): void {
  const section = document.getElementById(target);

  if (!section) {
    console.warn(`Section with id "${target}" was not found.`);
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.target),
    ).filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleScroll(): void {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY < 90;
      const isScrollingUp = currentScrollY < lastScrollY;

      setIsVisible(isNearTop || isScrollingUp || isOpen);
      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, lastScrollY]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function navigateTo(target: string): void {
    scrollToSection(target);
    setActiveSection(target);
    setIsOpen(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 28,
        scale: isVisible ? 1 : 0.96,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[60] -translate-x-1/2 lg:hidden"
    >
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Tutup menu navigasi"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 -z-10 cursor-default bg-[#2f241d]/10 backdrop-blur-[2px]"
              />

              <motion.nav
                aria-label="Navigasi undangan seluler"
                initial={{ opacity: 0, y: 22, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 18, scale: 0.94, filter: "blur(8px)" }}
                transition={{ duration: 0.42, ease: EASE }}
                className="absolute bottom-[calc(100%+0.75rem)] left-1/2 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/60 bg-[#fffaf0]/70 p-3 shadow-[0_22px_65px_rgba(62,46,33,0.24)] backdrop-blur-2xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/15 to-[#b99a6e]/20" />
                <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/50 blur-2xl" />

                <div className="relative grid grid-cols-4 gap-2">
                  {NAV_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.target;

                    return (
                      <motion.button
                        key={item.target}
                        type="button"
                        onClick={() => navigateTo(item.target)}
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.38,
                          delay: 0.04 + index * 0.035,
                          ease: EASE,
                        }}
                        whileTap={{ scale: 0.91 }}
                        className={`group relative flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 transition-colors duration-300 ${isActive
                            ? "border-[#97744c]/30 bg-[#715339] text-white shadow-[0_8px_22px_rgba(80,57,38,0.22)]"
                            : "border-white/50 bg-white/35 text-[#654e3b] hover:bg-white/70"
                          }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-navigation-active"
                            className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#826343] to-[#4d392a]"
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                          />
                        )}
                        <Icon />
                        <span className="text-[9px] font-medium uppercase tracking-[0.11em]">
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative mx-auto mt-3 flex items-center justify-center gap-2 text-[#8a7155]">
                  <span className="h-px w-12 bg-current opacity-30" />
                  <Heart size={11} className="fill-current" />
                  <span className="h-px w-12 bg-current opacity-30" />
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-1.5 rounded-full border border-white/70 bg-[#fffaf0]/65 p-1.5 shadow-[0_14px_45px_rgba(61,45,32,0.24)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/80 via-white/10 to-[#b9986b]/20" />

          <motion.button
            type="button"
            aria-label="Kembali ke beranda"
            onClick={() => navigateTo("home")}
            whileTap={{ scale: 0.9 }}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${activeSection === "home"
                ? "border-[#7a5b3d]/30 bg-[#604630] text-white"
                : "border-white/70 bg-white/45 text-[#654d39]"
              }`}
          >
            <Home size={19} strokeWidth={1.6} />
          </motion.button>

          <motion.button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup menu" : "Buka menu undangan"}
            onClick={() => setIsOpen((current) => !current)}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-12 items-center gap-2 rounded-full border border-white/70 bg-white/45 px-4 text-[#5e4735] transition hover:bg-white/70"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Menu
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}