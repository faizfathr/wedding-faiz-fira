import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { scrollToSection } from "./Utils";
import {
  KalimantanBaratOrnament,
  SulawesiBaratOrnament,
  CulturalDivider,
} from "./Ornament";
import { WEDDING, EASE } from "../data";

const HERO_BACKGROUND = "/images/main-bg.jpeg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-theme-primary px-5 pb-16 pt-24 text-center"
    >
      {/* Main background photo */}
      <motion.img
        src={HERO_BACKGROUND}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center grayscale-20"
      />

      {/* Dark gray overlay for readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/55"
        aria-hidden="true"
      />

      {/* Palette overlay keeps the photo consistent with the wedding theme */}
      <div
        className="pointer-events-none absolute inset-0 bg-theme-primary/30 mix-blend-multiply"
        aria-hidden="true"
      />

      {/* Soft cinematic focus behind the main content */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.58)_100%)]"
        aria-hidden="true"
      />

      {/* Warm blush lighting using the configured palette */}
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-theme-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-theme-surface-elevated/15 blur-3xl"
        aria-hidden="true"
      />

      <KalimantanBaratOrnament className="-left-12 top-24 h-56 w-56 !opacity-[0.12] text-theme-accent" />
      <SulawesiBaratOrnament className="-bottom-5 -right-8 h-60 w-80 !opacity-[0.12] text-theme-accent" />

      {/* Elegant inner frame over the photograph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute inset-4 rounded-4xl border border-theme-accent/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:inset-7 md:inset-9"
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
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-theme-accent/35 bg-black/25 px-4 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
          <Sparkles
            className="text-theme-accent"
            size={14}
            strokeWidth={1.4}
          />

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-theme-accent">
            Undangan Pernikahan
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-5 font-serif text-sm italic tracking-wide text-theme-surface-elevated"
        >
          Dengan penuh kasih, kami mengundang Anda
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
          className="font-serif text-6xl leading-[0.92] text-theme-surface drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl"
        >
          {WEDDING.groom.firstName}

          <motion.span
            animate={{ scale: [1, 1.06, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="block py-4 text-4xl italic text-theme-accent sm:inline sm:px-5 sm:text-5xl"
          >
            &
          </motion.span>

          {WEDDING.bride.firstName}
        </motion.h1>

        {/*
          If CulturalDivider contains dark hard-coded colors, add a `light`
          prop there and use <CulturalDivider light /> instead.
        */}
        <div className="text-theme-accent">
          <CulturalDivider />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="mx-auto w-fit rounded-2xl border border-theme-accent/30 bg-black/25 px-6 py-4 shadow-[0_14px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
          <p className="font-serif text-lg tracking-[0.08em] text-theme-surface">
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
          className="group mt-9 inline-flex items-center gap-3 rounded-full border border-theme-accent/50 bg-theme-primary/90 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-theme-page shadow-[0_14px_38px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors hover:bg-theme-primary"
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

/*
Place the main background photo here:

public/
└── images/
    └── hero/
        └── wedding-main.jpg

Recommended image:
- Landscape orientation
- At least 1920 x 1080 pixels
- Dark or gray aesthetic
- Couple positioned slightly off-center or centered
- Enough visual separation behind the text

CROP OPTIONS

Default:
object-cover object-center

Show more of the upper part:
object-cover object-top

Move focus toward the left:
object-cover object-[35%_center]

Move focus toward the right:
object-cover object-[65%_center]

OVERLAY OPTIONS

Photo too dark:
bg-black/55 -> bg-black/40

Photo too bright or text difficult to read:
bg-black/55 -> bg-black/65

Photo too brown/pink:
bg-theme-primary/30 -> bg-theme-primary/15
*/