import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MailOpen, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type WeddingLetterOpeningProps = {
  initials?: string;
  invitationTitle?: string;
  openLabel?: string;
  children: ReactNode;
};

export default function WeddingLetterOpening({
  initials = "A & N",
  invitationTitle = "Undangan Pernikahan",
  openLabel = "Buka undangan",
  children,
}: WeddingLetterOpeningProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isOpened && !showInvitation ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened, showInvitation]);

  function openInvitation(): void {
    if (isOpened) return;

    setIsOpened(true);
    window.setTimeout(() => setShowInvitation(true), 1450);
  }

  return (
    <div className="min-h-screen bg-theme-page text-theme-text">
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.section
            key="letter-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-12"
          >
            <BackgroundDecorations />

            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-10 w-full max-w-xl text-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-7"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-theme-border/80 bg-theme-surface/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-theme-primary shadow-sm backdrop-blur-xl">
                  <Sparkles size={13} />
                  {invitationTitle}
                </span>
              </motion.div>

              <div className="relative mx-auto aspect-1.5/1 w-full max-w-112.5 perspective:1400px">
                {/* Simple envelope base */}
                <motion.div
                  animate={
                    isOpened
                      ? { y: 14, scale: 0.97 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.75, ease: EASE }}
                  className="absolute inset-x-[5%] bottom-[7%] top-[10%] z-0 overflow-hidden rounded-[1.25rem] border border-theme-border bg-theme-surface-elevated shadow-[0_24px_65px_rgba(125,90,90,0.18)]"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-theme-surface to-theme-surface-elevated" />
                </motion.div>

                {/* Opening flap */}
                <motion.div
                  initial={false}
                  animate={
                    isOpened
                      ? {
                          rotateX: -180,
                          opacity: 0,
                          transitionEnd: { display: "none" },
                        }
                      : {
                          rotateX: 0,
                          opacity: 1,
                          display: "block",
                        }
                  }
                  transition={{
                    rotateX: { duration: 0.72, ease: EASE },
                    opacity: {
                      duration: 0.2,
                      delay: isOpened ? 0.5 : 0,
                    },
                  }}
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className={`absolute inset-x-[5%] top-[10%] h-[47%] rounded-t-[1.25rem] bg-theme-accent [clip-path:polygon(0_0,100%_0,50%_100%)] ${
                    isOpened ? "z-0" : "z-30"
                  }`}
                />

                {/* Letter */}
                <motion.div
                  initial={false}
                  animate={
                    isOpened
                      ? { y: -78, scale: 1, opacity: 1 }
                      : { y: 30, scale: 0.92, opacity: 0.78 }
                  }
                  transition={{
                    duration: 0.92,
                    delay: isOpened ? 0.46 : 0,
                    ease: EASE,
                  }}
                  className="absolute inset-x-[14%] bottom-[14%] z-20 h-[72%] rounded-xl border border-theme-border bg-theme-surface px-6 py-7 shadow-[0_16px_45px_rgba(125,90,90,0.14)]"
                >
                  <div className="absolute inset-2 rounded-lg border border-theme-primary/15" />

                  <div className="relative flex h-full flex-col items-center justify-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-theme-text-muted">
                      Dengan hangat mengundang
                    </p>

                    <Heart
                      className="my-4 fill-theme-accent text-theme-primary"
                      size={20}
                      strokeWidth={1.3}
                    />

                    <p className="font-serif text-5xl tracking-[0.08em] text-theme-primary sm:text-6xl">
                      {initials}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-theme-primary/55">
                      <span className="h-px w-9 bg-current" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                      <span className="h-px w-9 bg-current" />
                    </div>
                  </div>
                </motion.div>

                {/*
                  Simplified front pocket:
                  one clean classic shape instead of three overlapping layers.
                */}
                <motion.div
                  animate={
                    isOpened
                      ? { y: 14, scale: 0.97 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.75, ease: EASE }}
                  className="pointer-events-none absolute inset-x-[5%] bottom-[7%] z-20 h-[54%] overflow-hidden rounded-b-[1.25rem] border-x border-b border-theme-border bg-theme-surface-elevated [clip-path:polygon(0_0,50%_58%,100%_0,100%_100%,0_100%)]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-theme-accent/55 to-theme-surface-elevated" />
                  <div className="absolute inset-x-[14%] bottom-4 h-px bg-theme-primary/12" />
                </motion.div>

                <AnimatePresence>
                  {!isOpened && (
                    <motion.button
                      type="button"
                      onClick={openInvitation}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.65 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.45,
                        ease: EASE,
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      className="absolute left-1/2 top-[51%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-theme-surface bg-theme-primary text-white shadow-[0_10px_28px_rgba(125,90,90,0.3)]"
                      aria-label={openLabel}
                    >
                      <span className="absolute inset-1 rounded-full border border-theme-surface/25" />
                      <Heart
                        size={21}
                        className="fill-white"
                        strokeWidth={1.2}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {!isOpened && (
                  <motion.button
                    type="button"
                    onClick={openInvitation}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.75,
                      ease: EASE,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group mt-7 inline-flex items-center gap-3 border-b border-theme-primary/35 px-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary transition hover:border-theme-primary"
                  >
                    <MailOpen
                      size={16}
                      className="transition-transform group-hover:-rotate-6"
                    />
                    {openLabel}
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isOpened && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.62, duration: 0.45 }}
                    className="mt-6 text-sm italic text-theme-text-muted"
                  >
                    Sebuah undangan hangat sedang dibuka…
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        ) : (
          <motion.div
            key="invitation-content"
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BackgroundDecorations() {
  const hearts = [
    { position: "left-[12%] top-[18%]", delay: 0 },
    { position: "right-[14%] top-[24%]", delay: 0.8 },
    { position: "left-[18%] bottom-[16%]", delay: 1.5 },
    { position: "right-[20%] bottom-[18%]", delay: 2.1 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-[10%] h-64 w-64 rounded-full bg-theme-accent/55 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-24 bottom-[5%] h-72 w-72 rounded-full bg-theme-primary/10 blur-3xl"
      />

      {hearts.map((heart, index) => (
        <motion.div
          key={heart.position}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 6, 0],
          }}
          transition={{
            duration: 4.5,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${heart.position}`}
        >
          <Heart
            className="fill-theme-accent/70 text-theme-primary/30"
            size={index % 2 ? 17 : 13}
          />
        </motion.div>
      ))}
    </div>
  );
}
