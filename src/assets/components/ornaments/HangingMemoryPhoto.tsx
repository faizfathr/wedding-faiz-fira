import { motion } from "framer-motion";
import { HANGING_PHOTOS } from "../../data";

export default function HangingMemoryPhoto({
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