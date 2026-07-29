import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { KalimantanBaratOrnament } from "./Ornament";
import Heading from "./Heading";
import { WEDDING, EVENTS } from "../data";
import Countdown from "./Countdown";
import StaggerReveal from "./animations/StaggerReveal";
import Reveal from "./animations/Reveal";

export default function Events() {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-theme-surface-elevated px-5 py-24"
    >
      <KalimantanBaratOrnament className="-right-6 top-12 h-48 w-48" />
      <Heading eyebrow="Simpan tanggalnya" title="Rangkaian Acara" />

      <StaggerReveal
        className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
        stagger={0.18}
      >
        {EVENTS.map((event) => (
          <article
            key={event.title}
            className="h-full border border-theme-border bg-theme-surface p-8 text-center shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <CalendarDays
              className="mx-auto mb-5 text-theme-primary"
              strokeWidth={1.3}
            />

            <h3 className="font-serif text-3xl text-theme-text">
              {event.title}
            </h3>

            <p className="mt-5 text-sm font-semibold tracking-wider text-theme-text">
              {WEDDING.displayDate}
            </p>

            <p className="mt-2 inline-flex items-center gap-2 text-sm text-theme-text-muted">
              <Clock3 size={15} />
              {event.time}
            </p>

            <p className="mt-4 text-sm text-theme-text-muted">
              {event.description}
            </p>
          </article>
        ))}
      </StaggerReveal>

      <Reveal direction="up" delay={0.15} duration={0.9}>
        <div className="mx-auto mt-6 max-w-4xl border border-theme-primary bg-theme-primary px-7 py-8 text-center text-theme-page md:flex md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-theme-accent">
              Lokasi
            </p>
            <h3 className="mt-2 font-serif text-2xl">
              {WEDDING.venue}
            </h3>
            <p className="mt-1 text-sm text-theme-surface-elevated">
              {WEDDING.address}
            </p>
          </div>

          <a
            href={WEDDING.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-theme-accent px-5 py-3 text-xs uppercase tracking-widest transition hover:bg-theme-page hover:text-theme-primary md:mt-0"
          >
            <MapPin size={15} />
            Buka peta
          </a>
        </div>
      </Reveal>

      <Countdown />
    </section>
  );
}
