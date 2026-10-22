import { motion } from "framer-motion";
import type { RSVPEntry } from "./Types";
import { truncateWords } from "../Utils";


type MessageCardProps = {
  entry: RSVPEntry;
  index: number;
  onOpen: (entry: RSVPEntry) => void;
};
const EASE = [0.22, 1, 0.36, 1] as const;
export default function MessageCard({
  entry,
  index,
  onOpen,
}: MessageCardProps) {
  const messagePreview = truncateWords(
    entry.message,
    20,
  );

  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(entry)}
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.92,
        rotate: index % 2 === 0 ? -1.5 : 1.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        y: -16,
        scale: 0.94,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: EASE,
      }}
      whileHover={{
        y: -5,
        scale: 1.025,
        rotate: index % 2 === 0 ? -0.5 : 0.5,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="group relative flex min-h-40 w-full flex-col overflow-hidden rounded-xl border border-theme-border bg-theme-surface p-2.5 text-left shadow-[0_8px_24px_rgba(125,90,90,0.08)] transition-colors hover:border-theme-primary/35 sm:min-h-48 sm:p-4"
      aria-label={`Baca ucapan lengkap dari ${entry.name}`}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-theme-accent/35 blur-xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme-surface-elevated font-serif text-sm text-theme-primary sm:h-10 sm:w-10 sm:text-lg">
          {entry.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-xs text-theme-text sm:text-base">
            {entry.name}
          </h3>

          <p className="mt-0.5 truncate text-[7px] font-semibold uppercase tracking-[0.08em] text-theme-primary sm:text-[8px]">
            {entry.group || "Tamu Undangan"}
          </p>

          <p className="mt-0.5 hidden text-[8px] uppercase tracking-wider text-theme-text-muted sm:block">
            {entry.attendance}
          </p>
        </div>
      </div>

      <p className="relative mt-3 line-clamp-5 text-[10px] leading-4 text-theme-text-muted sm:text-sm sm:leading-6">
        “{messagePreview}”
      </p>

      <div className="relative mt-auto pt-3">
        <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-theme-primary sm:text-[9px]">
          Baca lengkap
        </span>

        <motion.span
          animate={{
            x: [0, 3, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="ml-1 inline-block text-theme-primary"
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}