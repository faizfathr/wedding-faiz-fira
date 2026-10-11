import { KalimantanBaratOrnament } from "./Ornament";
import { WEDDING } from "../data";
import Heading from "./Heading";

export default function Footer() {
  return (
    <footer className=" bg-theme-primary p-5 text-center text-theme-page">
      <KalimantanBaratOrnament className="-left-8 top-2 h-40 w-40 opacity-[0.05]" />
      <Heading 
        isDark={true}
        eyebrow="Terima kasih"
        title={`${WEDDING.groom.firstName} & ${WEDDING.bride.firstName}`}
        // description="Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir serta memberikan doa restu."
      />
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#f0e6d2]">
        Dibuat dengan hangat &copy; 2026
      </p>
    </footer>
  );
}
