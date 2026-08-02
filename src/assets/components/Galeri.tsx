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
            className={`relative flex min-h-85 items-end overflow-hidden bg-linear-to-br p-7 ${item.gradient} ${index === 1 ? "md:-translate-y-5" : ""
              }`}
          >
            <motion.div
              className="absolute inset-3 border border-theme-surface/30"
              whileHover={{ inset: 18 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-theme-surface/65">
                0{index + 1}
              </p>

              <h3 className="mt-2 font-serif text-3xl text-theme-surface">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-theme-surface/75">
                {item.caption}
              </p>
            </div>
          </motion.article>
        ))}
      </StaggerReveal>
    </section>
  );
}

