import { useEffect, useState } from "react";
import { WEDDING } from "../data";
import StaggerReveal from "./animations/StaggerReveal";
import { motion } from "framer-motion";

export default function Countdown() {
  const calculateTime = () => {
    const difference = Math.max(0, new Date(WEDDING.isoDate).getTime() - Date.now());
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
    <StaggerReveal
      className="mx-auto mt-14 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4"
      stagger={0.1}
    >
      {Object.entries(time).map(([label, value]) => (
        <motion.div
          key={label}
          whileHover={{
            y: -6,
            scale: 1.03,
          }}
          className="h-full border border-[#d7c9b3] bg-[#fffdf8]/80 px-2 py-5 text-center"
        >
          <strong className="block font-serif text-2xl font-normal text-[#503c2e] sm:text-4xl">
            {String(value).padStart(2, "0")}
          </strong>

          <span className="mt-1 block text-[9px] uppercase tracking-[0.16em] text-[#8c7658] sm:text-xs">
            {label}
          </span>
        </motion.div>
      ))}
    </StaggerReveal>
  );
}