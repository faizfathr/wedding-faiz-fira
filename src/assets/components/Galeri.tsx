import { motion } from "framer-motion";
import Heading from "./Heading";
import { GALLERY } from "../data";
import StaggerReveal from "./animations/StaggerReveal";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="bg-theme-primary px-5 py-24 text-theme-page"
    >
      <Heading
        eyebrow="Kenangan"
        title="Galeri Kami"
        description="Ruang sederhana untuk menyimpan potongan cerita yang berarti bagi kami."
      />

      <StaggerReveal
        className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3"
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
            className={`group relative flex min-h-85 items-end overflow-hidden ${
              index === 1 ? "md:-translate-y-5" : ""
            }`}
          >
            {item.photoUrl && (
              <img
                src={item.photoUrl}
                alt={item.caption}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Gradient overlay for text readability */}
            <div
              className={`absolute inset-0 bg-linear-to-b opacity-20 ${item.gradient}`}
            />

            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-theme-overlay/10 transition-colors duration-500 group-hover:bg-theme-overlay/5" />

            {/* Animated inner border */}
            <motion.div
              className="pointer-events-none absolute inset-3 border border-theme-surface/40"
              whileHover={{ inset: 18 }}
              transition={{ duration: 0.4 }}
            />

            {/* Gallery content */}
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
    </section>
  );
}

