import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { scrollToSection } from "./Utils";
import { KalimantanBaratOrnament, SulawesiBaratOrnament, CulturalDivider } from "./Ornament";
import { WEDDING, EASE } from "../data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-theme-page px-5 pb-16 pt-24 text-center"
    >
      {/* Soft palette-based ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-theme-accent),transparent_36%),radial-gradient(circle_at_bottom_right,var(--color-theme-surface-elevated),transparent_42%)] opacity-70"
        aria-hidden="true"
      />

      <motion.div
        animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-theme-accent/70 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-theme-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <KalimantanBaratOrnament className="-left-12 top-24 h-56 w-56" />
      <SulawesiBaratOrnament className="-bottom-5 -right-8 h-60 w-80" />

      {/* Modern framed-paper effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute inset-4 rounded-4xl border border-theme-border/70 bg-theme-surface/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[2px] sm:inset-7 md:inset-9"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: EASE }}
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-theme-border bg-theme-surface/65 px-4 py-2 shadow-[0_10px_35px_rgba(125,90,90,0.08)] backdrop-blur-xl"
        >
          <Sparkles className="text-theme-primary" size={14} strokeWidth={1.4} />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-theme-primary">
            Undangan Pernikahan
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-5 font-serif text-sm italic tracking-wide text-theme-text-muted"
        >
          Dengan penuh kasih, kami mengundang Anda
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
          className="font-serif text-6xl leading-[0.92] text-theme-primary sm:text-7xl md:text-8xl"
        >
          {WEDDING.groom.firstName}
          <motion.span
            animate={{ scale: [1, 1.06, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="block py-4 text-4xl italic text-theme-text-muted sm:inline sm:px-5 sm:text-5xl"
          >
            &
          </motion.span>
          {WEDDING.bride.firstName}
        </motion.h1>

        <CulturalDivider />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="mx-auto w-fit rounded-2xl border border-theme-border/70 bg-theme-surface/55 px-6 py-4 shadow-[0_14px_45px_rgba(125,90,90,0.1)] backdrop-blur-xl"
        >
          <p className="font-serif text-lg tracking-[0.08em] text-theme-text">
            {WEDDING.displayDate}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToSection("couple")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="group mt-9 inline-flex items-center gap-3 rounded-full border border-theme-primary/20 bg-theme-primary px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_14px_38px_rgba(125,90,90,0.24)] transition-colors hover:bg-theme-primary-hover"
        >
          Lihat undangan
          <ChevronDown
            className="transition-transform duration-300 group-hover:translate-y-1"
            size={17}
          />
        </motion.button>
      </motion.div>
    </section>
  );
}