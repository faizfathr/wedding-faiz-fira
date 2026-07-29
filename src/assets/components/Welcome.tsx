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
        document.body.style.overflow = isOpened && !showInvitation ? "hidden" : "";

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
                        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-12"
                    >
                        <BackgroundDecorations />

                        <motion.div
                            initial={{ opacity: 0, y: 36, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="relative z-10 w-full max-w-xl text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-7"
                            >
                                <span className="inline-flex items-center gap-2 rounded-full border border-theme-border/80 bg-theme-surface/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-theme-primary shadow-sm backdrop-blur-xl">
                                    <Sparkles size={13} />
                                    {invitationTitle}
                                </span>
                            </motion.div>

                            <div className="relative mx-auto aspect-[1.42/1] w-full max-w-[470px] [perspective:1400px]">
                                {/* Back of the envelope. Kept behind both the flap and letter. */}
                                <motion.div
                                    animate={
                                        isOpened
                                            ? { y: 18, scale: 0.96, rotate: -1 }
                                            : { y: 0, scale: 1, rotate: 0 }
                                    }
                                    transition={{ duration: 0.75, ease: EASE }}
                                    className="absolute inset-x-[4%] bottom-[5%] top-[8%] z-0 overflow-hidden rounded-[1.75rem] border border-theme-border bg-theme-surface shadow-[0_28px_80px_rgba(125,90,90,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-surface via-theme-surface to-theme-surface-elevated" />
                                </motion.div>

                                {/*
                  Envelope flap.
                  After opening, the flap moves behind the card and fades out.
                  backfaceVisibility prevents the reverse face covering the card.
                */}
                                <motion.div
                                    initial={false}
                                    animate={
                                        isOpened
                                            ? {
                                                rotateX: -180,
                                                y: -2,
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
                                        rotateX: { duration: 0.72, ease: EASE },
                                        opacity: { duration: 0.2, delay: isOpened ? 0.5 : 0 },
                                    }}
                                    style={{
                                        transformOrigin: "top center",
                                        transformStyle: "preserve-3d",
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                    }}
                                    className={`absolute inset-x-[4%] top-[8%] h-[48%] rounded-t-[1.75rem] bg-gradient-to-b from-theme-primary to-theme-accent [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_12px_28px_rgba(125,90,90,0.16)] ${isOpened ? "z-0" : "z-30"
                                        }`}
                                />

                                {/* Letter card. It stays above the opened flap. */}
                                <motion.div
                                    initial={false}
                                    animate={
                                        isOpened
                                            ? { y: -92, scale: 1, opacity: 1 }
                                            : { y: 35, scale: 0.91, opacity: 0.75 }
                                    }
                                    transition={{
                                        duration: 0.92,
                                        delay: isOpened ? 0.48 : 0,
                                        ease: EASE,
                                    }}
                                    className="absolute inset-x-[12%] bottom-[13%] z-20 h-[76%] rounded-[1.4rem] border border-theme-border bg-theme-surface px-6 py-7 shadow-[0_18px_55px_rgba(125,90,90,0.16)]"
                                >
                                    <div className="absolute inset-2 rounded-[1rem] border border-dashed border-theme-primary/25" />
                                    <div className="relative flex h-full flex-col items-center justify-center">
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-theme-text-muted">
                                            Dengan hangat mengundang
                                        </p>
                                        <Heart
                                            className="my-5 fill-theme-accent text-theme-primary"
                                            size={22}
                                            strokeWidth={1.4}
                                        />
                                        <p className="font-serif text-5xl tracking-[0.08em] text-theme-primary sm:text-6xl">
                                            {initials}
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-theme-primary/70">
                                            <span className="h-px w-10 bg-current" />
                                            <span className="h-2 w-2 rotate-45 bg-current" />
                                            <span className="h-px w-10 bg-current" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Front pocket remains above the lower part of the letter. */}
                                <motion.div
                                    animate={isOpened ? { y: 18, scale: 0.96, rotate: -1 } : { y: 0, scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.75, ease: EASE }}
                                    className="pointer-events-none absolute inset-x-[4%] bottom-[5%] top-[8%] z-20 overflow-hidden rounded-[1.75rem]"
                                    aria-hidden="true"
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-[74%] bg-gradient-to-tr from-theme-accent via-theme-surface-elevated to-theme-accent/80 [clip-path:polygon(0_28%,50%_72%,100%_28%,100%_100%,0_100%)]" />
                                    <div className="absolute inset-x-0 bottom-0 h-[74%] bg-theme-surface-elevated/95 [clip-path:polygon(0_28%,50%_73%,0_100%)]" />
                                    <div className="absolute inset-x-0 bottom-0 h-[74%] bg-theme-surface/80 [clip-path:polygon(100%_28%,50%_73%,100%_100%)]" />
                                </motion.div>

                                <AnimatePresence>
                                    {!isOpened && (
                                        <motion.button
                                            type="button"
                                            onClick={openInvitation}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.65 }}
                                            transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
                                            whileHover={{ scale: 1.07, rotate: -2 }}
                                            whileTap={{ scale: 0.92 }}
                                            className="absolute left-1/2 top-[51%] z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-theme-surface bg-gradient-to-br from-theme-primary to-theme-primary-dark text-white shadow-[0_12px_35px_rgba(125,90,90,0.32)]"
                                            aria-label={openLabel}
                                        >
                                            <span className="absolute inset-1 rounded-full border border-theme-surface/30" />
                                            <Heart size={26} className="fill-white" strokeWidth={1.3} />
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
                                        transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="group mt-8 inline-flex items-center gap-3 rounded-full border border-theme-border bg-theme-surface/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary shadow-[0_12px_36px_rgba(125,90,90,0.12)] backdrop-blur-xl transition hover:border-theme-primary/35 hover:bg-theme-surface"
                                    >
                                        <MailOpen
                                            size={17}
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
                                        className="mt-7 text-sm italic text-theme-text-muted"
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
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-20 top-[10%] h-64 w-64 rounded-full bg-theme-accent/65 blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 bottom-[5%] h-72 w-72 rounded-full bg-theme-primary/12 blur-3xl"
            />

            {hearts.map((heart, index) => (
                <motion.div
                    key={heart.position}
                    animate={{
                        y: [0, -12, 0],
                        rotate: [0, 8, 0],
                        scale: [1, 1.1, 1],
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
                        className="fill-theme-accent/80 text-theme-primary/40"
                        size={index % 2 ? 18 : 14}
                    />
                </motion.div>
            ))}
        </div>
    );
}
