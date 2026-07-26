import Reveal from "./animations/Reveal";
import { CulturalDivider } from "./Ornament";
export default function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto mb-12 max-w-2xl text-center">
      <Reveal direction="down" duration={0.65}>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#96764d]">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal direction="scale" delay={0.08} duration={0.8}>
        <h2 className="font-serif text-4xl text-[#483629] md:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal direction="fade" delay={0.15}>
        <CulturalDivider />
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.2}>
          <p className="leading-7 text-[#706458]">
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}