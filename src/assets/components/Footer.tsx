import { KalimantanBaratOrnament, CulturalDivider } from "./Ornament";
import { WEDDING } from "../data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#413126] px-5 py-16 text-center text-[#eee3d1]">
      <KalimantanBaratOrnament className="-left-8 top-2 h-40 w-40 !opacity-[0.05]" />
      <p className="text-xs uppercase tracking-[0.25em] text-[#c4ac89]">Terima kasih</p>
      <p className="mt-4 font-serif text-4xl">{WEDDING.groom.firstName} & {WEDDING.bride.firstName}</p>
      <CulturalDivider light />
      <p className="mx-auto max-w-lg text-sm leading-7 text-[#d6cabc]">Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir serta memberikan doa restu.</p>
      <p className="mt-10 text-[10px] uppercase tracking-[0.18em] text-[#9f8e7d]">Dibuat dengan hangat • 2026</p>
    </footer>
  );
}