import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { KalimantanBaratOrnament } from "./Ornament";
import Heading from "./Heading";
import { WEDDING, EVENTS } from "../data";
import Countdown from "./Countdown";
import StaggerReveal from "./animations/StaggerReveal";
import Reveal from "./animations/Reveal";

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-[#efe6d7] px-5 py-24">
      <KalimantanBaratOrnament className="-right-6 top-12 h-48 w-48" />
      <Heading eyebrow="Simpan tanggalnya" title="Rangkaian Acara" />

      <StaggerReveal
        className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
        stagger={0.18}
      >
        {EVENTS.map((event) => (
          <article
            key={event.title}
            className="h-full border border-[#bca98d] bg-[#faf6ee] p-8 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <CalendarDays
              className="mx-auto mb-5 text-[#937550]"
              strokeWidth={1.3}
            />

            <h3 className="font-serif text-3xl text-[#49372a]">
              {event.title}
            </h3>

            <p className="mt-5 text-sm font-semibold tracking-wider text-[#665445]">
              {WEDDING.displayDate}
            </p>

            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#746759]">
              <Clock3 size={15} />
              {event.time}
            </p>

            <p className="mt-4 text-sm text-[#7a6d60]">
              {event.description}
            </p>
          </article>
        ))}
      </StaggerReveal>

      <Reveal direction="up" delay={0.15} duration={0.9}>
        <div className="mx-auto mt-6 max-w-4xl border border-[#bca98d] bg-[#554235] px-7 py-8 text-center text-[#f9f2e5] md:flex md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d9c7a9]">Lokasi</p>
            <h3 className="mt-2 font-serif text-2xl">{WEDDING.venue}</h3>
            <p className="mt-1 text-sm text-[#ded4c5]">{WEDDING.address}</p>
          </div>
          <a href={WEDDING.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border border-[#d9c7a9] px-5 py-3 text-xs uppercase tracking-widest transition hover:bg-[#f5ecde] hover:text-[#554235] md:mt-0">
            <MapPin size={15} /> Buka peta
          </a>
        </div>
      </Reveal>

      <Countdown />
    </section >
  );
}