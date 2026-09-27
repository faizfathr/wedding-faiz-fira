import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Reveal from "./animations/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const VERSE_PARTS = [
  {
    text: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا",
    highlighted: false,
  },
  {
    text: "لِّتَسْكُنُوْٓا اِلَيْهَا",
    highlighted: true,
  },
  {
    text: "وَجَعَلَ بَيْنَكُمْ",
    highlighted: false,
  },
  {
    text: "مَّوَدَّةً وَّرَحْمَةً",
    highlighted: true,
  },
  {
    text: "اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ ۝٢١",
    highlighted: false,
  },
] as const;

export default function QuranVerse() {
  return (
    <section
      id="verse"
      className="relative overflow-hidden bg-theme-page px-5 py-24"
    >
      {/* Soft ambient palette decorations */}
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-theme-accent/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-theme-surface-elevated/80 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal direction="down" duration={0.7}>
          <header className="mb-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-theme-border bg-theme-surface shadow-[0_8px_24px_rgba(125,90,90,0.1)]">
              <Sparkles
                size={19}
                strokeWidth={1.25}
                className="text-theme-primary"
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-primary">
              Pedoman Cinta dan Kasih Sayang
            </p>
          </header>
        </Reveal>

        <motion.article
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden border border-theme-border bg-theme-surface px-6 py-10 shadow-[0_24px_70px_rgba(125,90,90,0.12)] sm:px-10 md:px-14"
        >
          {/* Decorative Quran-inspired double frame */}
          <div
            className="pointer-events-none absolute inset-3 border border-theme-primary/15"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-5 border border-theme-border/70"
            aria-hidden="true"
          />

          {/* Corner ornaments */}
          <CornerOrnament className="left-5 top-5" />
          <CornerOrnament className="right-5 top-5 rotate-90" />
          <CornerOrnament className="bottom-5 right-5 rotate-180" />
          <CornerOrnament className="bottom-5 left-5 -rotate-90" />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Arabic Quran text */}
            <div
              dir="rtl"
              lang="ar"
              className="text-center font-serif text-lg leading-[2.35] text-theme-text sm:text-4xl sm:leading-[2.25] md:text-[2.65rem]"
            >
              {VERSE_PARTS.map((part, index) => (
                <motion.span
                  key={part.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + index * 0.12,
                    ease: EASE,
                  }}
                  className={
                    part.highlighted
                      ? "mx-1 inline rounded-lg bg-theme-accent/75 px-2 py-1 text-theme-primary shadow-[inset_0_-1px_0_rgba(125,90,90,0.12)]"
                      : "mx-1 inline"
                  }
                >
                  {part.text}
                </motion.span>
              ))}
            </div>

            {/* Divider */}
            <div
              className="mx-auto my-2 flex max-w-sm items-center gap-3 text-theme-primary"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-current opacity-25" />
              <Heart
                size={15}
                strokeWidth={1.2}
                className="fill-theme-accent"
              />
              <span className="h-px flex-1 bg-current opacity-25" />
            </div>

            {/* Indonesian meaning */}
            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="font-serif text-sm leading-normal text-theme-text sm:text-xl sm:leading-9">
                “Di antara tanda-tanda kebesaran-Nya, Dia menciptakan bagi kalian
                pasangan dari jenis kalian sendiri agar kalian memperoleh
                ketenteraman bersamanya. Dia pun menumbuhkan di antara kalian
                cinta dan kasih sayang. Sesungguhnya dalam hal itu terdapat
                tanda-tanda bagi orang-orang yang mau berpikir.”
              </p>

              <footer className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-theme-primary">
                QS. Ar-Rum · 30:21
              </footer>
            </motion.blockquote>

            {/* Highlighted concepts */}
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-2 sm:gap-4">
              <MeaningPill arabic="سَكِيْنَة" label="Sakinah" delay={0.5} />
              <MeaningPill arabic="مَوَدَّة" label="Mawaddah" delay={0.62} />
              <MeaningPill arabic="رَحْمَة" label="Rahmah" delay={0.74} />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function MeaningPill({
  arabic,
  label,
  delay,
}: {
  arabic: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      className="border border-theme-border bg-theme-surface-elevated/65 px-2 py-4 text-center shadow-[0_8px_24px_rgba(125,90,90,0.07)] sm:px-4"
    >
      <p dir="rtl" lang="ar" className="font-serif text-xl text-theme-primary sm:text-2xl">
        {arabic}
      </p>
      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-theme-text-muted sm:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-12 w-12 text-theme-primary/25 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-px w-10 bg-current" />
      <span className="absolute left-0 top-0 h-10 w-px bg-current" />
      <span className="absolute left-2 top-2 h-2 w-2 rotate-45 border border-current" />
    </div>
  );
}

/*
INTEGRATION

1. Save this file as:
   src/components/QuranVerseSection.tsx

2. Import it in App.tsx:
   import QuranVerseSection from "./components/QuranVerseSection";

3. Recommended order:

   <Hero />
   <QuranVerseSection />
   <Couple />
   <Events />
   ...

4. If using the sketchbook transition:

   <SketchbookPage pageColor="bg-theme-page" pageNumber={2}>
     <QuranVerseSection />
   </SketchbookPage>

5. For better Arabic typography, add an Arabic font in index.html, such as
   Noto Naskh Arabic, and configure it in CSS:

   .font-quran {
     font-family: "Noto Naskh Arabic", serif;
   }

   Then replace `font-serif` on the Arabic blocks with `font-quran`.

The Arabic verse is Surah Ar-Rum 30:21. The Indonesian paragraph is an
original rendering of the verse's meaning for this invitation design.
Reference checked against Quran NU Online and Quran.com Indonesian.
*/