import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";
import { MEMORY_ALBUM } from "./../data";
import Heading from "./Heading";


export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-theme-primary px-5 text-theme-page"
    >

      <div className="relative mx-auto mt-10 max-w-6xl">
        <Reveal direction="up" duration={0.8}>
          <Heading
            isDark={true}
            eyebrow="Album Kenangan"
            title="Potongan Perjalanan Kami"
            description="Delapan bingkai kecil yang menyimpan tawa, perjalanan, dan langkah-langkah sederhana menuju hari bahagia kami."
          />
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
              className={`group relative min-h-64 origin-center bg-theme-surface p-2 shadow-[0_22px_50px_rgba(43,24,24,0.28)] sm:min-h-80 md:min-h-0 ${photo.className}`}
            >
              {/* Decorative tape */}
              <span
                className={`pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-20 -translate-x-1/2 bg-theme-accent/75 shadow-sm ${index % 3 === 0
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
            </motion.figure>
          ))}
        </div>

        <Reveal direction="fade" delay={0.2}>
          <div className="mx-auto m-5 flex max-w-md items-center gap-4 text-theme-accent">
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