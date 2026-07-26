import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { KalimantanBaratOrnament, SulawesiBaratOrnament, CulturalDivider } from "./Ornament";
import { scrollToSection } from "./Utils";
import { WEDDING } from "../data";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5efe3] px-5 pt-16 text-center">
      <KalimantanBaratOrnament className="-left-10 top-24 h-56 w-56" />
      <SulawesiBaratOrnament className="-bottom-5 -right-8 h-60 w-80" />
      <div className="absolute inset-5 border border-[#9e825b]/30 md:inset-9" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative z-10 max-w-3xl">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#8b7354]">Undangan Pernikahan</p>
        <Sparkles className="mx-auto mb-5 text-[#a18459]" size={24} strokeWidth={1.3} />
        <h1 className="font-serif text-6xl leading-none text-[#453428] sm:text-7xl md:text-8xl">
          {WEDDING.groom.firstName}
          <span className="block py-3 text-4xl italic text-[#a18459] sm:inline sm:px-4 sm:text-5xl">&</span>
          {WEDDING.bride.firstName}
        </h1>
        <CulturalDivider />
        <p className="font-serif text-lg tracking-wider text-[#5f5144]">{WEDDING.displayDate}</p>
        <button onClick={() => scrollToSection("couple")} className="mt-10 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#7c684d]">
          Buka undangan <ChevronDown className="animate-bounce" size={18} />
        </button>
      </motion.div>
    </section>
  );
}