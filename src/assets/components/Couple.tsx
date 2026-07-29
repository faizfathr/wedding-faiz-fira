import Heading from "./Heading";
import { SulawesiBaratOrnament } from "./Ornament";
import PersonCard from "./PersonCard";
import { WEDDING } from "../data";
import { Heart } from "lucide-react";
import Reveal from "./animations/Reveal";

export default function Couple() {
  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-theme-surface px-5 py-24"
    >
      <SulawesiBaratOrnament className="-left-20 top-10 h-52 w-80" />

      <Heading
        eyebrow="Dengan penuh syukur"
        title="Kedua Mempelai"
        description="Dengan memohon rahmat dan rida Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada hari bahagia kami."
      />

      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Reveal direction="right" duration={0.9}>
          <PersonCard
            initials="A"
            name={WEDDING.groom.fullName}
            parents={WEDDING.groom.parents}
            origin={WEDDING.groom.origin}
          // photoUrl="/images/groom.jpg"
          // photoAlt={`Foto ${WEDDING.groom.fullName}`}
          />
        </Reveal>

        <Reveal direction="scale" delay={0.15}>
          <Heart
            className="mx-auto fill-theme-accent text-theme-primary"
            size={28}
            strokeWidth={1}
          />
        </Reveal>

        <Reveal direction="left" duration={0.9}>
          <PersonCard
            initials="N"
            name={WEDDING.bride.fullName}
            parents={WEDDING.bride.parents}
            origin={WEDDING.bride.origin}
          // photoUrl="/images/bride.jpg"
          // photoAlt={`Foto ${WEDDING.bride.fullName}`}
          />
        </Reveal>
      </div>
    </section>
  );
}
