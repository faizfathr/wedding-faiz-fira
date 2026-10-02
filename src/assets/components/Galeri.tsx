import { motion } from "framer-motion";
import { GALLERY } from "../data";
import StaggerReveal from "./animations/StaggerReveal";
import { CulturalDivider } from "./Ornament";
import Reveal from "./animations/Reveal";

const MEMORY_ALBUM = [
  {
    src: "/images/gallery/album-01.jpg",
    alt: "Kenangan bersama pertama",
    caption: "Awal cerita kami",
    className: "md:col-span-4 md:row-span-5 -rotate-2",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/album-02.jpg",
    alt: "Kenangan perjalanan bersama",
    caption: "Perjalanan kecil yang berarti",
    className: "md:col-span-3 md:row-span-4 rotate-2 md:translate-y-7",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/album-03.jpg",
    alt: "Kenangan hari istimewa",
    caption: "Satu hari untuk dikenang",
    className: "md:col-span-5 md:row-span-4 -rotate-1",
    objectPosition: "object-top",
  },
  {
    src: "/images/gallery/album-04.jpg",
    alt: "Kenangan bersama keluarga",
    caption: "Bersama orang-orang tersayang",
    className: "md:col-span-3 md:row-span-4 rotate-3 md:-translate-y-3",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/album-05.jpg",
    alt: "Kenangan senja bersama",
    caption: "Senja dan cerita kita",
    className: "md:col-span-5 md:row-span-5 -rotate-2 md:translate-y-5",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/album-06.jpg",
    alt: "Kenangan perjalanan menuju pernikahan",
    caption: "Semakin dekat menuju selamanya",
    className: "md:col-span-4 md:row-span-4 rotate-1",
    objectPosition: "object-top",
  },
  {
    src: "/images/gallery/album-07.jpg",
    alt: "Kenangan sederhana bersama",
    caption: "Hal sederhana yang membahagiakan",
    className: "md:col-span-5 md:row-span-4 rotate-2 md:-translate-y-5",
    objectPosition: "object-center",
  },
  {
    src: "/images/gallery/album-08.jpg",
    alt: "Kenangan menjelang hari pernikahan",
    caption: "Menuju lembaran yang baru",
    className: "md:col-span-3 md:row-span-5 -rotate-3 md:translate-y-4",
    objectPosition: "object-center",
  },
] as const;

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-theme-primary px-5 py-24 text-theme-page"
    >
      <div
        className="pointer-events-none absolute -left-28 top-1/3 h-80 w-80 rounded-full bg-theme-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-16 h-96 w-96 rounded-full bg-theme-surface/10 blur-3xl"
        aria-hidden="true"
      />

      <header className="relative mx-auto mb-6 max-w-2xl text-center">
        <Reveal direction="down" duration={0.65}>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-theme-surface">
            Kenangan
          </p>
        </Reveal>

        <Reveal direction="scale" delay={0.08} duration={0.8}>
          <h2 className="font-serif text-4xl text-theme-surface md:text-5xl">
            Galeri Kami
          </h2>
        </Reveal>

        <Reveal direction="fade" delay={0.15}>
          <CulturalDivider isDark={true} />
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="leading-5 text-theme-surface/70">
            Ruang sederhana untuk menyimpan potongan cerita yang berarti bagi
            kami.
          </p>
        </Reveal>
      </header>

      {/* Featured gallery cards */}
      <StaggerReveal
        className="relative mx-auto grid max-w-5xl gap-4 md:grid-cols-3"
        stagger={0.16}
      >
        {GALLERY.map((item, index) => (
          <motion.article
            key={item.title}
            whileHover={{
              y: -10,
              scale: 1.025,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            className="group relative flex min-h-85 items-end overflow-hidden"
          >
            {item.photoUrl && (
              <img
                src={item.photoUrl}
                alt={item.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}

            <div
              className={`absolute inset-0 bg-linear-to-b opacity-20 ${item.gradient}`}
            />

            <div className="absolute inset-0 bg-theme-overlay/10 transition-colors duration-500 group-hover:bg-theme-overlay/5" />

            <motion.div
              className="pointer-events-none absolute inset-3 border border-theme-surface/40"
              whileHover={{ inset: 18 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative z-10 p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-theme-surface/70">
                0{index + 1}
              </p>

              <h3 className="mt-2 font-serif text-3xl text-theme-surface">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-theme-surface/80">
                {item.caption}
              </p>
            </div>
          </motion.article>
        ))}
      </StaggerReveal>

      {/* Extended memory album, still inside the same gallery section */}
      <div className="relative mx-auto mt-28 max-w-6xl">
        <Reveal direction="up" duration={0.8}>
          <header className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-theme-accent">
              Album Kenangan
            </p>

            <h3 className="mt-3 font-serif text-4xl text-theme-surface md:text-5xl">
              Potongan Perjalanan Kami
            </h3>

            <div className="mx-auto my-5 flex max-w-xs items-center gap-3 text-theme-accent">
              <span className="h-px flex-1 bg-current opacity-35" />
              <span className="h-2.5 w-2.5 rotate-45 border border-current" />
              <span className="h-px flex-1 bg-current opacity-35" />
            </div>

            <p className="text-sm leading-6 text-theme-surface/70">
              Delapan bingkai kecil yang menyimpan tawa, perjalanan, keluarga,
              dan langkah-langkah sederhana menuju hari bahagia kami.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:auto-rows-[62px] md:grid-cols-12 md:gap-6">
          {MEMORY_ALBUM.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{
                opacity: 0,
                y: 32,
                rotate: index % 2 === 0 ? -3 : 3,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: "spring",
                stiffness: 105,
                damping: 19,
                delay: Math.min(index * 0.08, 0.4),
              }}
              whileHover={{
                zIndex: 20,
                y: -10,
                rotate: index % 2 === 0 ? -1.5 : 1.5,
                scale: 1.035,
              }}
              className={`group relative min-h-64 origin-center bg-theme-surface p-2 pb-12 shadow-[0_22px_50px_rgba(43,24,24,0.28)] sm:min-h-80 md:min-h-0 ${photo.className}`}
            >
              {/* Decorative tape */}
              <span
                className={`pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-20 -translate-x-1/2 bg-theme-accent/75 shadow-sm ${
                  index % 3 === 0
                    ? "-rotate-3"
                    : index % 3 === 1
                      ? "rotate-2"
                      : "-rotate-1"
                }`}
                aria-hidden="true"
              />

              <div className="h-full min-h-52 overflow-hidden bg-theme-surface-elevated sm:min-h-68 md:min-h-0">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover ${photo.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>

              <figcaption className="absolute inset-x-3 bottom-3 truncate text-center font-serif text-sm italic text-theme-primary sm:text-base">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <Reveal direction="fade" delay={0.2}>
          <div className="mx-auto mt-20 flex max-w-md items-center gap-4 text-theme-accent">
            <span className="h-px flex-1 bg-current opacity-35" />
            <p className="font-serif text-sm italic text-theme-surface/75">
              Delapan foto, satu cerita yang terus bertumbuh
            </p>
            <span className="h-px flex-1 bg-current opacity-35" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}