import { motion } from "framer-motion";
import { EASE } from "../data";

function KalimantanBaratOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute grid rotate-12 grid-cols-4 gap-2 opacity-[0.1] ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="h-8 w-8 rotate-45 rounded-sm border-2 border-theme-primary p-2"
        >
          <span className="block h-full w-full rounded-full bg-theme-primary" />
        </span>
      ))}
    </div>
  );
}

function SulawesiBaratOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute text-theme-primary opacity-[0.1] ${className}`}
      viewBox="0 0 240 140"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <path
          key={index}
          d={`M ${10 + index * 40} 120 Q ${27 + index * 40} 35 ${44 + index * 40} 120 Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
      ))}
      <path d="M4 122 H236" stroke="currentColor" strokeWidth="4" />
      <path
        d="M14 132 H226"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
    </svg>
  );
}

function CulturalDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.7 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      className="mx-auto flex w-full max-w-sm items-center gap-3 py-6 text-theme-primary"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <span className="h-2 w-2 rotate-45 border border-current" />
      <HeartMark />
      <span className="h-2 w-2 rotate-45 border border-current" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </motion.div>
  );
}

function HeartMark() {
  return (
    <span className="relative flex h-5 w-5 rotate-45 items-center justify-center rounded-sm bg-theme-primary shadow-[0_4px_12px_rgba(125,90,90,0.2)]">
      <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
    </span>
  );
}

export { KalimantanBaratOrnament, SulawesiBaratOrnament, CulturalDivider, HeartMark };
