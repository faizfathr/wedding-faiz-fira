import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Reveal from "./animations/Reveal";
import { HANGING_PHOTOS, STORIES } from "../data";
import Heading from "./Heading";


function HangingMemoryPhoto({
  photo,
  index,
}: {
  photo: (typeof HANGING_PHOTOS)[number];
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: -28, rotate: index % 2 === 0 ? -6 : 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 115,
        damping: 17,
        delay: index * 0.12,
      }}
      whileHover={{
        y: -8,
        rotate: index % 2 === 0 ? -2 : 2,
        scale: 1.025,
      }}
      className={`relative w-40 origin-top sm:w-48 md:w-52 ${photo.rotation}`}
    >
      {/* Hanging string */}
      <div
        className="absolute bottom-full left-1/2 h-0.5 w-px -translate-x-1/2 bg-theme-primary/35 sm:h-1"
        aria-hidden="true"
      />

      {/* Wooden pin */}
      <div
        className="absolute -top-3 left-1/2 z-20 h-7 w-3 -translate-x-1/2 rounded-sm border border-theme-primary/25 bg-theme-accent shadow-sm"
        aria-hidden="true"
      />

      {/* Polaroid card */}
      <div className="border border-theme-border bg-theme-surface p-2 pb-5 shadow-[0_14px_35px_rgba(125,90,90,0.14)]">
        <div className="aspect-square overflow-hidden bg-theme-surface-elevated">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </motion.figure>
  );
}

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-theme-surface px-5 py-24"
    >
      {/* Subtle decorative background */}
      <div
        className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full bg-theme-accent/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-theme-surface-elevated/70 blur-3xl"
        aria-hidden="true"
      />

      {/* Hanging memories */}


      {/* Existing section title appears after memories */}
      <Heading
        eyebrow="Perjalanan kami"
        title="Cerita Cinta"
        description="Setiap pertemuan, perjalanan, dan keputusan membawa kami semakin dekat menuju hari bahagia ini."
      />

      {/* Story timeline */}
      <div className="relative mx-auto mb-5 max-w-5xl pt-2 text-center">

          <div className="absolute inset-x-[8%] top-[107px] h-px bg-theme-primary/25 sm:inset-x-[13%]" />

          <div className="relative flex items-start justify-center gap-4 sm:gap-8 md:gap-12">
            {HANGING_PHOTOS.map((photo, index) => (
              <HangingMemoryPhoto
                key={photo.src}
                photo={photo}
                index={index}
              />
            ))}
          </div>
        </div>
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute bottom-0 left-[31px] top-0 w-px bg-theme-border"
          aria-hidden="true"
        />
        
        {STORIES.map((story, index) => (
          <Reveal
            key={story.year}
            direction={index % 2 === 0 ? "right" : "left"}
            delay={index * 0.08}
            duration={0.85}
          >
            <article className="relative grid grid-cols-[64px_1fr] gap-5 pb-12 last:pb-0">
              {/* Heart-shaped timeline marker */}
              <motion.div
                whileHover={{
                  scale: 1.12,
                  rotate: index % 2 === 0 ? -5 : 5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                }}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-theme-border bg-theme-surface shadow-[0_8px_24px_rgba(125,90,90,0.1)]"
              >
                <Heart
                  size={34}
                  strokeWidth={1.25}
                  className="fill-theme-accent text-theme-primary"
                />

                <span className="absolute font-serif text-[10px] font-semibold text-theme-primary">
                  {story.year.slice(-2)}
                </span>
              </motion.div>

              {/* Story content */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="border border-theme-border bg-theme-surface-elevated/55 p-6 shadow-[0_12px_32px_rgba(125,90,90,0.07)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-theme-primary">
                  {story.year}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-theme-text">
                  {story.title}
                </h3>

                <p className="mt-3 leading-5 text-theme-text-muted">
                  {story.description}
                </p>
              </motion.div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}