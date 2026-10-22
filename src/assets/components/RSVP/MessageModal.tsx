import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Heart, Users, X } from "lucide-react";
import type { RSVPEntry } from "./Types";

const EASE = [0.22, 1, 0.36, 1] as const;
type MessageModalProps = {
  entry: RSVPEntry | null;
  onClose: () => void;
};

export default function MessageModal({
  entry,
  onClose,
}: MessageModalProps) {
  if (
    !entry ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={entry.id}
        className="fixed inset-0 z-100 flex items-center justify-center px-5 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          type="button"
          aria-label="Tutup ucapan"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-theme-overlay/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.article
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-modal-title"
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.86,
            rotate: -2,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.9,
            rotate: 2,
            filter: "blur(6px)",
          }}
          transition={{
            type: "spring",
            stiffness: 190,
            damping: 20,
            mass: 0.85,
          }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-theme-border bg-theme-surface p-6 shadow-[0_30px_90px_rgba(40,20,20,0.32)] sm:p-9"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-theme-accent/50 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-theme-surface-elevated blur-3xl"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-theme-border bg-theme-surface-elevated text-theme-primary transition hover:bg-theme-primary hover:text-theme-page"
            aria-label="Tutup"
          >
            <X size={17} />
          </button>

          <div className="relative flex items-center gap-4 pr-10">
            <motion.div
              initial={{
                scale: 0.6,
                rotate: -15,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 16,
                delay: 0.12,
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-theme-accent font-serif text-2xl text-theme-primary"
            >
              {entry.name.charAt(0).toUpperCase()}
            </motion.div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-theme-primary">
                Ucapan dari
              </p>

              <h3
                id="message-modal-title"
                className="mt-1 font-serif text-2xl text-theme-text"
              >
                {entry.name}
              </h3>
            </div>
          </div>
          <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full bg-theme-accent/55 px-3 py-1.5">
            <Users
              size={12}
              className="shrink-0 text-theme-primary"
            />

            <span className="truncate text-[9px] font-semibold uppercase tracking-[0.1em] text-theme-primary">
              {entry.group || "Tamu Undangan"}
            </span>
          </div>

          <div className="relative my-6 flex items-center gap-3 text-theme-primary">
            <span className="h-px flex-1 bg-current opacity-20" />

            <Heart
              size={16}
              className="fill-theme-accent"
              strokeWidth={1.2}
            />

            <span className="h-px flex-1 bg-current opacity-20" />
          </div>

          <motion.blockquote
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease: EASE,
            }}
            className="relative max-h-[55vh] overflow-y-auto pr-2 font-serif text-lg leading-8 text-theme-text sm:text-xl sm:leading-9"
          >
            “{entry.message}”
          </motion.blockquote>

          <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-theme-surface-elevated px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-theme-primary">
              {entry.attendance}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-theme-primary px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-theme-page transition hover:bg-theme-primary-hover"
            >
              Tutup ucapan
            </button>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}