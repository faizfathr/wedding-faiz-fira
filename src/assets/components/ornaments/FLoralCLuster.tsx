import { motion } from "framer-motion";

export default function FloralCluster({ position }: { position: "left" | "right" }) {
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

