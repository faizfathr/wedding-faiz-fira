import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, VolumeX, Volume2 } from "lucide-react";
const EASE = [0.22, 1, 0.36, 1] as const;
const MUSIC_URL = "/music/music.mp3"; 

type WeddingLetterOpeningProps = {
  initials?: string;
  invitationTitle?: string;
  openLabel?: string;
  children: ReactNode;
};

export default function WeddingLetterOpening({
  initials = "F & M",
  invitationTitle = "Undangan Pernikahan",
  openLabel = "Geser atau klik untuk membuka",
  children,
}: WeddingLetterOpeningProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow =
      isOpened && !showInvitation ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened, showInvitation]);
  async function playMusic(): Promise<void> {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.volume = 0.45;

      await audio.play();

      setIsMusicPlaying(true);
    } catch (error) {
      console.warn(
        "Music could not start automatically:",
        error,
      );

      setIsMusicPlaying(false);
    }
  }

  function pauseMusic(): void {
    audioRef.current?.pause();
    setIsMusicPlaying(false);
  }

  async function toggleMusic(): Promise<void> {
    if (isMusicPlaying) {
      pauseMusic();
      return;
    }

    await playMusic();
  }
  function openInvitation(): void {
    if (isOpened) return;

    setIsOpened(true);

    void playMusic();

    window.setTimeout(() => {
      setShowInvitation(true);
    }, 1450);
  }

  return (
    <div className="min-h-screen bg-theme-page text-theme-text">
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={() => setIsMusicPlaying(false)}
      />
      <AnimatePresence>
        {isOpened && (
          <motion.button
            type="button"
            onClick={() => void toggleMusic()}
            initial={{
              opacity: 0,
              scale: 0.75,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              y: 12,
            }}
            transition={{
              duration: 0.4,
              ease: EASE,
            }}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="fixed bottom-24 right-5 z-70 flex h-12 w-12 items-center justify-center rounded-full border border-theme-accent bg-theme-primary text-theme-accent shadow-[0_12px_35px_rgba(125,90,90,0.28)] backdrop-blur-xl sm:bottom-6"
            aria-label={
              isMusicPlaying
                ? "Matikan musik"
                : "Putar musik"
            }
            title={
              isMusicPlaying
                ? "Matikan musik"
                : "Putar musik"
            }
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={
                  isMusicPlaying
                    ? "playing"
                    : "paused"
                }
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.22,
                  ease: EASE,
                }}
              >
                {isMusicPlaying ? (
                  <Volume2 size={19} />
                ) : (
                  <VolumeX size={19} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.section
            key="letter-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-12"
          >
            <AmbientBackground />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-10 w-full max-w-lg text-center"
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-theme-text-muted">
                {invitationTitle}
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                className="mb-8 font-serif text-4xl italic tracking-wide text-theme-primary sm:text-5xl"
              >
                {initials}
              </motion.h1>

              <div className="relative mx-auto aspect-[1.48/1] w-full max-w-107.5 perspective-[1400px]">
                <FloralCluster position="left" />
                <FloralCluster position="right" />

                {/* Envelope base: only theme-primary and theme-accent. */}
                <motion.div
                  animate={isOpened ? { y: 14, scale: 0.97 } : { y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-x-[7%] bottom-[8%] top-[8%] z-0 overflow-hidden rounded-sm border border-theme-primary/20 bg-theme-primary shadow-[0_18px_45px_rgba(125,90,90,0.2)]"
                />
                {/* The letter pops out only after the flap finishes opening. */}
                <motion.div
                  initial={false}
                  animate={
                    isOpened
                      ? {
                        y: -82,
                        opacity: 1,
                        scale: 1,
                      }
                      : {
                        y: 90,
                        opacity: 0,
                        scale: 0.88,
                      }
                  }
                  transition={
                    isOpened
                      ? {
                        type: "spring",
                        stiffness: 190,
                        damping: 18,
                        mass: 0.9,
                        delay: 0.78,
                      }
                      : {
                        duration: 0.3,
                        ease: EASE,
                      }
                  }
                  className="absolute inset-x-[17%] bottom-[13%] z-20 h-[70%] border border-theme-primary/20 bg-theme-accent px-5 py-6 shadow-[0_12px_32px_rgba(125,90,90,0.14)]"
                >
                  <motion.div
                    animate={
                      isOpened
                        ? { scale: [0.96, 1.035, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: isOpened ? 1.02 : 0,
                      ease: EASE,
                    }}
                    className="flex h-full items-center justify-center border border-theme-primary/25"
                  >
                    <p className="font-serif text-4xl tracking-widest text-theme-primary sm:text-5xl">
                      {initials}
                    </p>
                  </motion.div>
                </motion.div>

                {/* The top flap flips upward first. */}
                <motion.div
                  initial={false}
                  animate={
                    isOpened
                      ? {
                        rotateX: -180,
                        y: -5,
                        opacity: 0,
                        transitionEnd: { display: "none" },
                      }
                      : {
                        rotateX: 0,
                        y: 0,
                        opacity: 1,
                        display: "block",
                      }
                  }
                  transition={{
                    rotateX: {
                      duration: 0.72,
                      ease: EASE,
                    },
                    y: {
                      duration: 0.72,
                      ease: EASE,
                    },
                    opacity: {
                      duration: 0.12,
                      delay: isOpened ? 0.62 : 0,
                    },
                  }}
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                  }}
                  className={`absolute inset-x-[7%] top-[8%] h-[55%] bg-theme-primary [clip-path:polygon(0_0,100%_0,50%_100%)] ${isOpened ? "z-0" : "z-30"
                    }`}
                >
                  <div className="absolute inset-0 bg-theme-primary" />
                  <div className="absolute inset-x-[12%] top-[14%] h-px bg-theme-accent/25" />
                </motion.div>


                {/* Light front pocket. */}
                <motion.div
                  animate={isOpened ? { y: 14, scale: 0.97 } : { y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="pointer-events-none absolute inset-x-[7%] bottom-[8%] z-20 h-[62%] overflow-hidden rounded-b-sm border-x border-b border-theme-primary/20 bg-theme-accent [clip-path:polygon(0_0,50%_48%,100%_0,100%_100%,0_100%)]"
                  aria-hidden="true"
                />
                <AnimatePresence>
                  {!isOpened && (
                    <motion.button
                      type="button"
                      onClick={openInvitation}
                      initial={{ opacity: 0, scale: 0.68 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.92 }}
                      className="absolute left-1/2 top-[52%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-theme-accent bg-theme-primary text-theme-accent shadow-[0_8px_24px_rgba(125,90,90,0.3)]"
                      aria-label="Buka undangan"
                    >
                      <span className="absolute inset-1 rounded-full border border-theme-accent/30" />
                      <Heart size={20} className="fill-current" strokeWidth={1.2} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {!isOpened ? (
                  <motion.button
                    key="open-control"
                    type="button"
                    onClick={openInvitation}
                    drag="x"
                    dragConstraints={{ left: 0, right: 80 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 45) openInvitation();
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.55, delay: 0.7, ease: EASE }}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-5 inline-flex cursor-grab items-center gap-3 border-b border-theme-primary/30 px-2 py-2 font-serif text-sm italic tracking-wide text-theme-text-muted active:cursor-grabbing"
                  >
                    <span>{openLabel}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                      className="text-theme-primary"
                    >
                      →
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.p
                    key="opening-message"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                    className="mt-5 font-serif text-sm italic text-theme-text-muted"
                  >
                    Membuka undangan…
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        ) : (
          <motion.div
            key="invitation-content"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloralCluster({ position }: { position: "left" | "right" }) {
  const isLeft = position === "left";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, rotate: isLeft ? -6 : 6 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isLeft ? [-4, -1, -4] : [4, 1, 4],
        y: [0, -4, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.25 },
        scale: { duration: 0.6, delay: 0.25 },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`pointer-events-none absolute z-40 h-32 w-28 ${isLeft ? "-left-2 -top-3" : "-right-2 -bottom-5 rotate-180"
        }`}
      aria-hidden="true"
    >
      {/* Rounded hydrangea-like flower cluster inspired by the reference. */}
      <div className="absolute left-3 top-1 h-20 w-20">
        {[
          [28, 4, 15],
          [10, 18, 17],
          [45, 18, 18],
          [25, 27, 19],
          [5, 40, 15],
          [47, 42, 16],
          [25, 51, 18],
        ].map(([left, top, size], index) => (
          <motion.span
            key={index}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              duration: 3 + index * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left, top, width: size, height: size }}
            className="absolute rounded-full border border-theme-primary/15 bg-theme-accent shadow-[inset_0_0_0_3px_rgba(255,255,255,0.18)]"
          />
        ))}
      </div>

      {/* Two simple pink blossoms. */}
      <div className="absolute right-0 top-5 h-10 w-10">
        {[0, 72, 144, 216, 288].map((rotation) => (
          <span
            key={rotation}
            style={{ transform: `rotate(${rotation}deg) translateY(-8px)` }}
            className="absolute left-3 top-3 h-5 w-3 origin-bottom rounded-full bg-theme-primary/65"
          />
        ))}
        <span className="absolute left-3.5 top-3.5 h-3 w-3 rounded-full bg-theme-accent" />
      </div>


      <div className="absolute right-3 top-14 h-8 w-8 scale-75">
        {[0, 72, 144, 216, 288].map((rotation) => (
          <span
            key={rotation}
            style={{ transform: `rotate(${rotation}deg) translateY(-6px)` }}
            className="absolute left-2.5 top-2.5 h-4 w-2.5 origin-bottom rounded-full bg-theme-primary/55"
          />
        ))}
        <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-theme-accent" />
      </div>


      {/* Hanging floral strands similar to the cascading flowers in the photo. */}
      <div className="absolute left-8 top-17 flex gap-2">
        {[58, 78, 48].map((height, index) => (
          <motion.span
            key={height}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              duration: 3.4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ height }}
            className="relative w-px origin-top bg-theme-primary/35"
          >
            {[14, 29, 44].map((top) => (
              <span
                key={top}
                style={{ top }}
                className="absolute -left-1 h-2 w-2 rounded-full bg-theme-primary/50"
              />
            ))}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-20 top-[12%] h-64 w-64 rounded-full bg-theme-accent/35 blur-3xl" />
      <div className="absolute -right-20 bottom-[8%] h-72 w-72 rounded-full bg-theme-accent/45 blur-3xl" />
    </div>
  );
}
