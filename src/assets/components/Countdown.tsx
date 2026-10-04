import { useEffect, useState } from "react";
import { WEDDING } from "../data";
import StaggerReveal from "./animations/StaggerReveal";
import { motion } from "framer-motion";

export default function Countdown() {
  const calculateTime = () => {
    const difference = Math.max(
      0,
      new Date(WEDDING.isoDate).getTime() - Date.now(),
    );

    return {
      Hari: Math.floor(difference / 86_400_000),
      Jam: Math.floor((difference / 3_600_000) % 24),
      Menit: Math.floor((difference / 60_000) % 60),
      Detik: Math.floor((difference / 1_000) % 60),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculateTime()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-5 max-w-2xl">
      {/* Countdown heading */}
      <motion.header
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-8 text-center"
      >

        <h3 className="mt-3 font-serif text-3xl text-theme-primary sm:text-4xl">
          Menuju Hari Bahagia
        </h3>


        <p className="mx-auto mt-1 max-w-md text-sm italic leading-6 text-theme-text-muted">
          Setiap detik membawa kami semakin dekat menuju awal perjalanan baru.
        </p>
      </motion.header>

      <StaggerReveal
        className="grid grid-cols-4 gap-2 sm:gap-4"
        stagger={0.1}
      >
        {Object.entries(time).map(
          ([label, value]) => (
            <motion.div
              key={label}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="relative h-full overflow-hidden border border-theme-border bg-theme-surface/80 px-2 py-5 text-center shadow-[0_10px_30px_rgba(125,90,90,0.08)] backdrop-blur-sm"
            >
              <div
                className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full bg-theme-accent/30 blur-xl"
                aria-hidden="true"
              />

              <strong className="relative block font-serif text-2xl font-normal text-theme-text sm:text-4xl">
                {String(value).padStart(2, "0")}
              </strong>

              <span className="relative mt-1 block text-[9px] uppercase tracking-[0.16em] text-theme-text-muted sm:text-xs">
                {label}
              </span>
            </motion.div>
          ),
        )}
      </StaggerReveal>
    </div>
  );
}
